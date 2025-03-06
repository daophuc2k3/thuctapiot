import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';  // Kết nối Prisma Service

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Để có thể sử dụng PrismaService ở các module khác
})
export class PrismaModule {}
