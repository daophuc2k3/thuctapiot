import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class EnvCheckMiddleware implements NestMiddleware {
    private configService;
    constructor(configService: ConfigService);
    use(req: any, res: any, next: () => void): void;
}
