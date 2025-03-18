import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService từ @nestjs/config

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  // Method để lấy giá trị từ .env
  getJwtSecret() {
    const jwtSecret = this.configService.get<string>('JWT_SECRET'); // Lấy giá trị JWT_SECRET
    return jwtSecret; // Trả về giá trị JWT_SECRET từ .env
  }
}
