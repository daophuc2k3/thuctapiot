import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { request } from 'express';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Sửa lại để trả về Promise<boolean>
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context); 
    return result as boolean;  // Đảm bảo trả về boolean
  }
}
