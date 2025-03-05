import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from './dto/response.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<ResponseDto<any>>;
    findAll(): Promise<ResponseDto<any[]>>;
    findOne(id: string): Promise<ResponseDto<any>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseDto<any>>;
    remove(id: string): Promise<ResponseDto<any>>;
}
