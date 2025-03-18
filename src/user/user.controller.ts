import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponseDto } from './dto/response.dto';
import { Roles } from '../auth/roles.decorator';  // Import Roles Decorator
import { RolesGuard } from '../auth/roles.guard';  // Import RolesGuard

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
    const user = await this.userService.create(createUserDto);
    return new ResponseDto(201, 'User created successfully', user);
  }


  @Get()
  async findAll(
    @Query('page') page: number = 1,  // Số trang, mặc định là 1
    @Query('limit') limit: number = 10, // Số bản ghi mỗi trang, mặc định là 10
    @Query('order') order: string = 'desc', // Thứ tự sắp xếp, mặc định là 'desc'
    @Query('name') name?: string, // Lọc theo tên (tùy chọn)
  ): Promise<ResponseDto<any>> {
    const skip = (page - 1) * limit; // Tính số lượng bản ghi cần bỏ qua (for pagination)

    const users = await this.userService.findAll({
      skip,
      take: limit,
      order,
      name,
    });

    if (!users || users.length === 0) {
      return new ResponseDto(404, 'No users found', null);
    }

    return new ResponseDto(200, 'Users fetched successfully', users);
  }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<any>> {
    const user = await this.userService.findOne(id);
  
    if (!user) {
      return new ResponseDto(404, 'User not found', null);
    }
  
    // Trả về thông tin User cùng với Profile
    return new ResponseDto(200, 'User fetched successfully', {
      ...user,
      profile: user.profile,  // Đảm bảo rằng thông tin profile cũng được trả về
    });
  }
  
  @Put(':id')
  @UseGuards(RolesGuard) // Ensure that only users with appropriate roles can update
  @Roles('admin') // Only admins can update users
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto<any>> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return new ResponseDto(200, 'User updated successfully', updatedUser);
  }

  @Delete(':id')
  @UseGuards(RolesGuard) // Ensure that only users with appropriate roles can delete
  @Roles('admin') // Only admins can delete users
  async remove(@Param('id') id: string): Promise<ResponseDto<any>> {
    await this.userService.remove(id);
    return new ResponseDto(200, 'User deleted successfully', null);
  }

  @Post(':userId/profile')
  async updateProfile(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto): Promise<ResponseDto<any>> {
    const profile = await this.userService.updateProfile(userId, updateProfileDto);
    return new ResponseDto(200, 'Profile updated successfully', profile);
  }

  @Get(':userId/profile')
  async findProfile(@Param('userId') userId: string): Promise<ResponseDto<any>> {
    const profile = await this.userService.findProfile(userId);
    if (!profile) {
      return new ResponseDto(404, 'Profile not found', null);
    }
    return new ResponseDto(200, 'Profile fetched successfully', profile);
  }

  @Post(':userId/posts')
  @UseGuards(RolesGuard) // Use RolesGuard to check roles
  @Roles('user', 'admin')  // Both user and admin can create a post
  async createPost(@Param('userId') userId: string, @Body() createPostDto: CreatePostDto): Promise<ResponseDto<any>> {
    const post = await this.userService.createPost(createPostDto, Number(userId)); 
    return new ResponseDto(201, 'Post created successfully', post);
  }

  @Get(':userId/posts')
  @UseGuards(RolesGuard) // Kiểm tra quyền người dùng
  @Roles('user', 'admin') // Cả user và admin đều có quyền xem bài viết
  async findPosts(
    @Param('userId') userId: string,  // Lấy userId từ URL
    @Query('page') page: number = 1,  // Số trang, mặc định là 1
    @Query('limit') limit: number = 10, // Số bản ghi mỗi trang, mặc định là 10
    @Query('order') order: string = 'desc', // Thứ tự sắp xếp, mặc định là 'desc'
    @Query('title') title?: string, // Lọc theo tiêu đề (tùy chọn)
  ): Promise<ResponseDto<any>> {
    const skip = (page - 1) * limit; // Tính số lượng bản ghi cần bỏ qua (for pagination)
  
    // Truyền các tham số vào service để xử lý
    const posts = await this.userService.findPosts({
      userId,
      skip,
      take: limit,
      order,
      title,
    });
  
    if (!posts || posts.length === 0) {
      return new ResponseDto(404, 'No posts found', null);
    }
  
    return new ResponseDto(200, 'Posts fetched successfully', posts);
  }

  @Put(':userId/posts/:postId')
  @UseGuards(RolesGuard)  // Ensure that only admins can update posts
  @Roles('admin') // Only admin can update posts
  async updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto): Promise<ResponseDto<any>> {
    const updatedPost = await this.userService.updatePost(postId, updatePostDto);
    return new ResponseDto(200, 'Post updated successfully', updatedPost);
  }

  @Delete(':userId/posts/:postId')
  @UseGuards(RolesGuard)  // Ensure that only admins can delete posts
  @Roles('admin') // Only admin can delete posts
  async removePost(@Param('postId') postId: string): Promise<ResponseDto<any>> {
    await this.userService.removePost(postId);
    return new ResponseDto(200, 'Post deleted successfully', null);
  }
}
