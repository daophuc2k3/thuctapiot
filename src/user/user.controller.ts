import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Route tạo người dùng
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
    const user = await this.userService.create(createUserDto);
    return new ResponseDto(201, 'User created successfully', user);
  }

  // Route lấy tất cả người dùng
  @Get()
  async findAll(): Promise<ResponseDto<any[]>> {
    const users = await this.userService.findAll();
    return new ResponseDto(200, 'Users fetched successfully', users);
  }

  // Route lấy thông tin người dùng theo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<any>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      return new ResponseDto(404, 'User not found', null);
    }
    return new ResponseDto(200, 'User fetched successfully', user);
  }

  // Route cập nhật thông tin người dùng
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto<any>> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return new ResponseDto(200, 'User updated successfully', updatedUser);
  }

  // Route xóa người dùng
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto<any>> {
    await this.userService.remove(id);
    return new ResponseDto(200, 'User deleted successfully', null);
  }

  // Route tạo hoặc cập nhật Profile
  @Post(':userId/profile')
  async updateProfile(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto): Promise<ResponseDto<any>> {
    const profile = await this.userService.updateProfile(userId, updateProfileDto);
    return new ResponseDto(200, 'Profile updated successfully', profile);
  }

  // Route lấy Profile của người dùng
  @Get(':userId/profile')
  async findProfile(@Param('userId') userId: string): Promise<ResponseDto<any>> {
    const profile = await this.userService.findProfile(userId);
    if (!profile) {
      return new ResponseDto(404, 'Profile not found', null);
    }
    return new ResponseDto(200, 'Profile fetched successfully', profile);
  }

  // Route tạo bài viết
  @Post(':userId/posts')
  async createPost(
    @Param('userId') userId: string, 
    @Body() createPostDto: CreatePostDto
  ): Promise<ResponseDto<any>> {
    // Truyền userId từ URL vào Service, không truyền userId trong DTO
    const post = await this.userService.createPost(createPostDto, Number(userId)); // Lỗi này sẽ không còn
    return new ResponseDto(201, 'Post created successfully', post);
  }
  // Route lấy tất cả bài viết của người dùng
  @Get(':userId/posts')
  async findPosts(@Param('userId') userId: string): Promise<ResponseDto<any[]>> {
    const posts = await this.userService.findPosts(userId);
    return new ResponseDto(200, 'Posts fetched successfully', posts);
  }

  // Route cập nhật bài viết
  @Put(':userId/posts/:postId')
  async updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto): Promise<ResponseDto<any>> {
    const updatedPost = await this.userService.updatePost(postId, updatePostDto);
    return new ResponseDto(200, 'Post updated successfully', updatedPost);
  }

  // Route xóa bài viết
  @Delete(':userId/posts/:postId')
  async removePost(@Param('postId') postId: string): Promise<ResponseDto<any>> {
    await this.userService.removePost(postId);
    return new ResponseDto(200, 'Post deleted successfully', null);
  }
}
