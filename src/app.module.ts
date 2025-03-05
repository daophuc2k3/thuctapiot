// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],  // Nhập module người dùng
  controllers: [],
  providers: [],
})
export class AppModule {}
