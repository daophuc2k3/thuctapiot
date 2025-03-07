import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'; // Đảm bảo sử dụng PassportStrategy thay vì JwtStrategy
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Trích xuất JWT từ Header
      secretOrKey: 'your-secret-key', // Mã khóa bảo mật
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, email: payload.email, roles: payload.roles }; // Lấy thông tin từ JWT
  }
}
