import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    isActive: boolean;
}
export declare class UsersService {
    private users;
    create(createUserDto: CreateUserDto): User;
    findAll(): User[];
    findOne(id: string): User | undefined;
    update(id: string, updateUserDto: UpdateUserDto): User | null;
    remove(id: string): User | null;
}
