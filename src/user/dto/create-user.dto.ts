import { IsString, IsNotEmpty, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  bio: string; // Thêm bio vào DTO

  @IsString()
  @IsNotEmpty()
  avatar: string; // Thêm avatar vào DTO

  @IsString()
  @IsNotEmpty()
  address: string; // Thêm address vào DTO

}
