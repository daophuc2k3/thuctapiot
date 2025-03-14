import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const startTime = Date.now();
    console.log(`Request... ${req.method} ${req.originalUrl}`);
    
    res.on('finish', () => { // Khi phản hồi hoàn tất
      const duration = Date.now() - startTime;
      console.log(`Response... ${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    
    next(); // Tiếp tục chuỗi middleware
  }
}
