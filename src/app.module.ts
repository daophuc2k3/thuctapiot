import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware'; 
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EnvCheckMiddleware } from './env-check.middleware';  // Import middleware
import { MqttModule } from './mqtt/mqtt.module';


@Module({
  imports: [UserModule, AuthModule, PrismaModule,  ConfigModule.forRoot({isGlobal: true,}),MqttModule], 
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnvCheckMiddleware) 
      .forRoutes('*'); 
  }
}
