import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
    const user = await this.userService.create(createUserDto);
    return new ResponseDto(201, 'User created successfully', user); 
  }

  @Get()
  async findAll(): Promise<ResponseDto<any[]>> {
    const users = await this.userService.findAll();
    return new ResponseDto(200, 'Users fetched successfully', users); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<any>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      return new ResponseDto(404, 'User not found', null); 
    }
    return new ResponseDto(200, 'User fetched successfully', user); 
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto<any>> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return new ResponseDto(200, 'User updated successfully', updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto<any>> {
    await this.userService.remove(id);
    return new ResponseDto(200, 'User deleted successfully', null); 
  }
}
