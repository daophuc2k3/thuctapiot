import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';  // Import ExecutionContext từ @nestjs/common
import { Reflector } from '@nestjs/core';  // Sửa Reflector từ @nestjs/core
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {  // Khởi tạo Reflector trong constructor
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);  // Chờ đợi kết quả từ JwtAuthGuard
    if (!result) {
      return false; // Nếu không xác thực, trả về false
    }

    // Lấy roles từ metadata của controller hoặc method
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Nếu không có roles, cho phép truy cập
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Kiểm tra xem user có quyền truy cập không
    return roles.some(role => user.roles?.includes(role));  // Kiểm tra roles
  }
}
