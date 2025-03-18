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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const response_dto_1 = require("./dto/response.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        const user = await this.userService.create(createUserDto);
        return new response_dto_1.ResponseDto(201, 'User created successfully', user);
    }
    async findAll(page = 1, limit = 10, order = 'desc', name) {
        const skip = (page - 1) * limit;
        const users = await this.userService.findAll({
            skip,
            take: limit,
            order,
            name,
        });
        if (!users || users.length === 0) {
            return new response_dto_1.ResponseDto(404, 'No users found', null);
        }
        return new response_dto_1.ResponseDto(200, 'Users fetched successfully', users);
    }
    async findOne(id) {
        const user = await this.userService.findOne(id);
        if (!user) {
            return new response_dto_1.ResponseDto(404, 'User not found', null);
        }
        return new response_dto_1.ResponseDto(200, 'User fetched successfully', {
            ...user,
            profile: user.profile,
        });
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.userService.update(id, updateUserDto);
        return new response_dto_1.ResponseDto(200, 'User updated successfully', updatedUser);
    }
    async remove(id) {
        await this.userService.remove(id);
        return new response_dto_1.ResponseDto(200, 'User deleted successfully', null);
    }
    async updateProfile(userId, updateProfileDto) {
        const profile = await this.userService.updateProfile(userId, updateProfileDto);
        return new response_dto_1.ResponseDto(200, 'Profile updated successfully', profile);
    }
    async findProfile(userId) {
        const profile = await this.userService.findProfile(userId);
        if (!profile) {
            return new response_dto_1.ResponseDto(404, 'Profile not found', null);
        }
        return new response_dto_1.ResponseDto(200, 'Profile fetched successfully', profile);
    }
    async createPost(userId, createPostDto) {
        const post = await this.userService.createPost(createPostDto, Number(userId));
        return new response_dto_1.ResponseDto(201, 'Post created successfully', post);
    }
    async findPosts(userId, page = 1, limit = 10, order = 'desc', title) {
        const skip = (page - 1) * limit;
        const posts = await this.userService.findPosts({
            userId,
            skip,
            take: limit,
            order,
            title,
        });
        if (!posts || posts.length === 0) {
            return new response_dto_1.ResponseDto(404, 'No posts found', null);
        }
        return new response_dto_1.ResponseDto(200, 'Posts fetched successfully', posts);
    }
    async updatePost(postId, updatePostDto) {
        const updatedPost = await this.userService.updatePost(postId, updatePostDto);
        return new response_dto_1.ResponseDto(200, 'Post updated successfully', updatedPost);
    }
    async removePost(postId) {
        await this.userService.removePost(postId);
        return new response_dto_1.ResponseDto(200, 'Post deleted successfully', null);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('order')),
    __param(3, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':userId/profile'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(':userId/profile'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findProfile", null);
__decorate([
    (0, common_1.Post)(':userId/posts'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(':userId/posts'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findPosts", null);
__decorate([
    (0, common_1.Put)(':userId/posts/:postId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':userId/posts/:postId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removePost", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map