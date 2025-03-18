import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Tạo mới người dùng
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        address: createUserDto.address,
        profile: {
          create: {
            bio: createUserDto.bio,      // Tạo Profile với bio
            avatar: createUserDto.avatar, // Tạo Profile với avatar
          },
        },
      },
    });
  }
  
  

  // Lấy tất cả người dùng (Không bao gồm thông tin profile)
  async findAll({
    skip = 0,
    take = 10,
    order = 'desc',
    name,
  }: {
    skip: number;
    take: number;
    order: string;
    name?: string;
  }) {
    const users = await this.prisma.user.findMany({
      skip, // Bỏ qua các bản ghi cho phân trang
      take, // Lấy số lượng bản ghi nhất định
      orderBy: {
        id: order === 'desc' ? 'desc' : 'asc', // Sắp xếp theo id, mặc định là descending
      },
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined, // Lọc theo tên (nếu có)
      },
      include: {
        profile: true, // Bao gồm thông tin profile
      },
    });
  
    return users;
  }
  
  
  // Lấy thông tin người dùng theo ID
  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        posts: true,
        profile: true, // Bao gồm thông tin profile (bio, avatar)
      },
    });
  }

  // Cập nhật thông tin người dùng
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: updateUserDto,
    });
  }

  // Xóa người dùng
  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  //Cập nhật Profile cho người dùng
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.update({
      where: { userId: Number(userId) }, // Sử dụng userId làm điều kiện
      data: {
        bio: updateProfileDto.bio || 'No bio provided', // Cập nhật bio, nếu không có thì dùng mặc định
        avatar: updateProfileDto.avatar || 'https://default-avatar.com/avatar.jpg', // Cập nhật avatar, nếu không có thì dùng mặc định
      },
    });
  }
  
  
  // Lấy Profile của người dùng
  async findProfile(userId: string) {
    return await this.prisma.profile.findUnique({
      where: { userId: Number(userId) },
    });
  }

  // Tạo bài viết
  async createPost(createPostDto: CreatePostDto, userId: number) {
    // Đảm bảo rằng userId được thêm vào bài viết
    return await this.prisma.post.create({
      data: {
        ...createPostDto,
        userId: userId, // Lấy userId từ body (từ Param trên controller)
      },
    });
  }
  
  // Lấy tất cả bài viết của người dùng
  async findPosts({
    userId,
    skip = 0,
    take = 10,
    order = 'desc',
    title,
  }: {
    userId: string;
    skip: number;
    take: number;
    order: string;
    title?: string;
  }) {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: Number(userId),
        title: title ? { contains: title, mode: 'insensitive' } : undefined, // Lọc theo tiêu đề (nếu có)
      },
      skip, // Số bản ghi cần bỏ qua (for pagination)
      take, // Số bản ghi cần lấy
      orderBy: {
        id: order === 'desc' ? 'desc' : 'asc', // Sắp xếp theo id, mặc định là descending
      },
    });
  
    return posts;
  }
  
  // Cập nhật bài viết
  async updatePost(postId: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id: Number(postId) },
      data: updatePostDto,
    });
  }

  // Xóa bài viết
  async removePost(postId: string) {
    return await this.prisma.post.delete({
      where: { id: Number(postId) },
    });
  }
}
