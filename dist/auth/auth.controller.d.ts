import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';
import { RegisterDto } from '../user/dto/register.dto';
import { ResponseDto } from '../user/dto/response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<ResponseDto<any>>;
    login(loginDto: LoginDto): Promise<ResponseDto<any>>;
}
