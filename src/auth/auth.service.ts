// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { PrismaService } from '../prisma/prisma.service';
// import { LoginDto } from '../user/dto/login.dto';
// import { RegisterDto } from '../user/dto/register.dto';
// import { ResponseDto } from '../user/dto/response.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private prisma: PrismaService,
//     private jwtService: JwtService,
//   ) {}

//   async register(registerDto: RegisterDto) {
//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);
//     return this.prisma.user.create({
//       data: { ...registerDto, password: hashedPassword },
//     });
//   }

//   async login(loginDto: LoginDto) {
//     const user = await this.prisma.user.findUnique({
//       where: { email: loginDto.email },
//     });
//     if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
//       throw new Error('Invalid credentials');
//     }
//     const payload = { email: user.email, id: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
 
// }

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../user/dto/login.dto';
import { RegisterDto } from '../user/dto/register.dto';
import { ResponseDto } from '../user/dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Đăng ký người dùng và tạo Profile cùng lúc
  async register(registerDto: RegisterDto) {
    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  
    return this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,  // Mật khẩu đã mã hóa
        address: registerDto.address,  // Đảm bảo address là một trường trong User
        profile: {
          create: {
            bio: registerDto.bio || '',  // Nếu không có bio, để trống
            avatar: registerDto.avatar || '', // Nếu không có avatar, để trống
          },
        },
      },
    });
  }
  
  
  
  // Đăng nhập và trả về token JWT
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: { profile: true }, // Lấy thông tin Profile liên quan khi login
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    // Payload chứa thông tin cần thiết cho JWT
    const payload = { email: user.email, id: user.id };

    // Tạo và trả về JWT token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
