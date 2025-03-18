import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          // Kiểm tra nếu dữ liệu trả về là null hoặc undefined
          if (!data) {
            return {
              status: 'error',
              message: 'No data found',
              data: null,
            };
          }
          
          // Trả về dữ liệu theo dạng chuẩn
          return {
            status: 'success',
            message: 'Request successful',
            data,
          };
        }),
      );
    }
  }
  