// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from '../user/dto/login.dto';
// import { RegisterDto } from '../user/dto/register.dto';
// import { ResponseDto } from '../user/dto/response.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   // Route đăng ký
//   @Post('register')
//   @HttpCode(HttpStatus.CREATED) // HTTP Status 201 (Created)
//   async register(@Body() registerDto: RegisterDto): Promise<ResponseDto<any>> {
//     const user = await this.authService.register(registerDto);
//     return new ResponseDto(201, 'User registered successfully', user); 
//   }

//   // Route đăng nhập
//   @Post('login')
//   @HttpCode(HttpStatus.OK) // HTTP Status 200 (OK)
//   async login(@Body() loginDto: LoginDto): Promise<ResponseDto<any>> {
//     const { access_token } = await this.authService.login(loginDto);
//     return new ResponseDto(200, 'Login successful!', { access_token });
//   }
// }

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';
import { RegisterDto } from '../user/dto/register.dto';
import { ResponseDto } from '../user/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Route đăng ký
  @Post('register')
  @HttpCode(HttpStatus.CREATED) // HTTP Status 201 (Created)
  async register(@Body() registerDto: RegisterDto): Promise<ResponseDto<any>> {
    const user = await this.authService.register(registerDto); // Tạo user và profile
    return new ResponseDto(201, 'User registered successfully', user);
  }

  // Route đăng nhập
  @Post('login')
  @HttpCode(HttpStatus.OK) // HTTP Status 200 (OK)
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<any>> {
    const { access_token } = await this.authService.login(loginDto); // Tạo token
    return new ResponseDto(200, 'Login successful!', { access_token });
  }
}
