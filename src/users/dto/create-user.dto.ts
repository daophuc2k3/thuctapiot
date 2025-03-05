// src/users/dto/create-user.dto.ts
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  readonly isActive: boolean;
}
