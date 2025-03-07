import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../user/dto/login.dto';
import { RegisterDto } from '../user/dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        name: string;
        email: string;
        password: string;
        address: string;
        id: number;
        roles: string[];
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
