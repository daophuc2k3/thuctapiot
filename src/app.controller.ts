import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('jwt-secret')
  getJwtSecret() {
    return this.appService.getJwtSecret(); // Gọi method để lấy giá trị JWT_SECRET từ .env
  }
}
