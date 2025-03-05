// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.service';  // Import kiểu User từ service

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {  // Đảm bảo trả về kiểu User
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): User[] {  // Đảm bảo trả về mảng User
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {  // Đảm bảo trả về kiểu User hoặc undefined
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User | null {  // Đảm bảo trả về kiểu User hoặc null
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): User | null {  // Đảm bảo trả về kiểu User hoặc null
    return this.usersService.remove(id);
  }
}
