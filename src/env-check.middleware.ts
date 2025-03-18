// src/env-check.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvCheckMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    const jwtSecret = this.configService.get('JWT_SECRET');
    const databaseUrl = this.configService.get('DATABASE_URL');
    const port = this.configService.get('PORT');

    // Nếu một trong các biến không có giá trị, ném lỗi
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is missing in environment variables!');
    }
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is missing in environment variables!');
    }
    if (!port) {
      throw new Error('PORT is missing in environment variables!');
    }
    next();
  }
}
