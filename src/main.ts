import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './response.interceptor'; // Đảm bảo đường dẫn đúng

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sử dụng ValidationPipe để tự động xác thực các DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Chuyển đổi dữ liệu sang class DTO
    whitelist: true,  // Loại bỏ các thuộc tính không có trong DTO
    forbidNonWhitelisted: true,  // Bắt lỗi nếu có thuộc tính không hợp lệ
  }));

  const config = new DocumentBuilder()
  .setTitle('API Documentation')  // Tiêu đề API
  .setDescription('API Description')  // Mô tả API
  .setVersion('1.0')  // Phiên bản API
  .addTag('users')  // Tên tag cho các endpoint
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // Swagger UI sẽ hiển thị ở /api
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3001);
}
bootstrap();
