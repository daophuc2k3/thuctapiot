import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import * as dotenv from 'dotenv';
dotenv.config();  // Nạp biến môi trường từ file .env

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Lấy secret từ biến môi trường
      signOptions: { expiresIn: '1h' }, // Thời gian hết hạn của token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
