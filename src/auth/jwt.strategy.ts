import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'; // Đảm bảo sử dụng PassportStrategy thay vì JwtStrategy
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config'; // Đảm bảo import ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Trích xuất JWT từ Header
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, email: payload.email, roles: payload.roles }; // Lấy thông tin từ JWT
  }
}
