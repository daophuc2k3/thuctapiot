export class ResponseDto<T> {
    statusCode: number;
    message: string;
    body: T;
  
    constructor(statusCode: number, message: string, body: T) {
      this.statusCode = statusCode;
      this.message = message;
      this.body = body;
    }
  }
  