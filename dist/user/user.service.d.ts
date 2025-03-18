import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        address: string;
        id: number;
        roles: string[];
    }>;
    findAll({ skip, take, order, name, }: {
        skip: number;
        take: number;
        order: string;
        name?: string;
    }): Promise<({
        profile: {
            bio: string;
            avatar: string;
            id: number;
            userId: number;
        } | null;
    } & {
        name: string;
        email: string;
        password: string;
        address: string;
        id: number;
        roles: string[];
    })[]>;
    findOne(id: string): Promise<({
        profile: {
            bio: string;
            avatar: string;
            id: number;
            userId: number;
        } | null;
        posts: {
            title: string;
            content: string;
            id: number;
            userId: number;
        }[];
    } & {
        name: string;
        email: string;
        password: string;
        address: string;
        id: number;
        roles: string[];
    }) | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        address: string;
        id: number;
        roles: string[];
    }>;
    remove(id: string): Promise<{
        name: string;
        email: string;
        password: string;
        address: string;
        id: number;
        roles: string[];
    }>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<{
        bio: string;
        avatar: string;
        id: number;
        userId: number;
    }>;
    findProfile(userId: string): Promise<{
        bio: string;
        avatar: string;
        id: number;
        userId: number;
    } | null>;
    createPost(createPostDto: CreatePostDto, userId: number): Promise<{
        title: string;
        content: string;
        id: number;
        userId: number;
    }>;
    findPosts({ userId, skip, take, order, title, }: {
        userId: string;
        skip: number;
        take: number;
        order: string;
        title?: string;
    }): Promise<{
        title: string;
        content: string;
        id: number;
        userId: number;
    }[]>;
    updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<{
        title: string;
        content: string;
        id: number;
        userId: number;
    }>;
    removePost(postId: string): Promise<{
        title: string;
        content: string;
        id: number;
        userId: number;
    }>;
}
