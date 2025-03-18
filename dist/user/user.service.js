"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        return await this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: createUserDto.password,
                address: createUserDto.address,
                profile: {
                    create: {
                        bio: createUserDto.bio,
                        avatar: createUserDto.avatar,
                    },
                },
            },
        });
    }
    async findAll({ skip = 0, take = 10, order = 'desc', name, }) {
        const users = await this.prisma.user.findMany({
            skip,
            take,
            orderBy: {
                id: order === 'desc' ? 'desc' : 'asc',
            },
            where: {
                name: name ? { contains: name, mode: 'insensitive' } : undefined,
            },
            include: {
                profile: true,
            },
        });
        return users;
    }
    async findOne(id) {
        return await this.prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                posts: true,
                profile: true,
            },
        });
    }
    async update(id, updateUserDto) {
        return await this.prisma.user.update({
            where: { id: Number(id) },
            data: updateUserDto,
        });
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: { id: Number(id) },
        });
    }
    async updateProfile(userId, updateProfileDto) {
        return await this.prisma.profile.update({
            where: { userId: Number(userId) },
            data: {
                bio: updateProfileDto.bio || 'No bio provided',
                avatar: updateProfileDto.avatar || 'https://default-avatar.com/avatar.jpg',
            },
        });
    }
    async findProfile(userId) {
        return await this.prisma.profile.findUnique({
            where: { userId: Number(userId) },
        });
    }
    async createPost(createPostDto, userId) {
        return await this.prisma.post.create({
            data: {
                ...createPostDto,
                userId: userId,
            },
        });
    }
    async findPosts({ userId, skip = 0, take = 10, order = 'desc', title, }) {
        const posts = await this.prisma.post.findMany({
            where: {
                userId: Number(userId),
                title: title ? { contains: title, mode: 'insensitive' } : undefined,
            },
            skip,
            take,
            orderBy: {
                id: order === 'desc' ? 'desc' : 'asc',
            },
        });
        return posts;
    }
    async updatePost(postId, updatePostDto) {
        return await this.prisma.post.update({
            where: { id: Number(postId) },
            data: updatePostDto,
        });
    }
    async removePost(postId) {
        return await this.prisma.post.delete({
            where: { id: Number(postId) },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map