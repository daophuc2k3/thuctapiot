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
        ...createUserDto,
      },
    });
  }

  // Lấy tất cả người dùng (Không bao gồm thông tin profile)
  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        posts: false,
        profile: false,  // Loại bỏ thông tin profile (bio, avatar)
      },
    });
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

  // Cập nhật hoặc tạo Profile cho người dùng
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.upsert({
      where: { userId: Number(userId) },
      update: {
        bio: updateProfileDto.bio || '',  // Đảm bảo bio không phải là undefined
        avatar: updateProfileDto.avatar || '',  // Đảm bảo avatar không phải là undefined
      },
      create: {
        userId: Number(userId),
        bio: updateProfileDto.bio || '',  // Đảm bảo bio không phải là undefined
        avatar: updateProfileDto.avatar || '',  // Đảm bảo avatar không phải là undefined
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
  async findPosts(userId: string) {
    return await this.prisma.post.findMany({
      where: { userId: Number(userId) },
    });
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
