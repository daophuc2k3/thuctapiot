import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponseDto } from './dto/response.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<ResponseDto<any>>;
    findAll(page?: number, limit?: number, order?: string, name?: string): Promise<ResponseDto<any>>;
    findOne(id: string): Promise<ResponseDto<any>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseDto<any>>;
    remove(id: string): Promise<ResponseDto<any>>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<ResponseDto<any>>;
    findProfile(userId: string): Promise<ResponseDto<any>>;
    createPost(userId: string, createPostDto: CreatePostDto): Promise<ResponseDto<any>>;
    findPosts(userId: string, page?: number, limit?: number, order?: string, title?: string): Promise<ResponseDto<any>>;
    updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<ResponseDto<any>>;
    removePost(postId: string): Promise<ResponseDto<any>>;
}
