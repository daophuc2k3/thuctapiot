import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sử dụng ValidationPipe để tự động xác thực các DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Chuyển đổi dữ liệu sang class DTO
    whitelist: true,  // Loại bỏ các thuộc tính không có trong DTO
    forbidNonWhitelisted: true,  // Bắt lỗi nếu có thuộc tính không hợp lệ
  }));

  await app.listen(3001);
}
bootstrap();
