// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  isActive: boolean;
}

@Injectable()
export class UsersService {
  // Khai báo kiểu mảng này chứa các đối tượng kiểu User
  private users: User[] = [];

  // Tạo người dùng mới
  create(createUserDto: CreateUserDto) {
    const newUser: User = { id: Date.now(), ...createUserDto }; // Tạo id giả lập bằng thời gian
    this.users.push(newUser);
    return newUser;
  }

  // Lấy danh sách người dùng
  findAll() {
    return this.users;
  }

  // Lấy thông tin người dùng theo ID
  findOne(id: string) {
    return this.users.find(user => user.id === Number(id));
  }

  // Cập nhật thông tin người dùng
  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex(user => user.id === Number(id));
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
      return this.users[userIndex];
    }
    return null;
  }

  // Xóa người dùng
  remove(id: string) {
    const userIndex = this.users.findIndex(user => user.id === Number(id));
    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1);
      return deletedUser[0];
    }
    return null;
  }
}
