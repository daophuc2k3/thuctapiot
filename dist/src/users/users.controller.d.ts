import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): User;
    findAll(): User[];
    findOne(id: string): User | undefined;
    update(id: string, updateUserDto: UpdateUserDto): User | null;
    remove(id: string): User | null;
}
