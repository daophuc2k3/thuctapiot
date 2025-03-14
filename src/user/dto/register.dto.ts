import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(1, 50) 
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  bio: string = ''; // Đảm bảo bio có giá trị mặc định là chuỗi rỗng

  @IsOptional()
  @IsString()
  avatar: string = ''; // Đảm bảo avatar có giá trị mặc định là chuỗi rỗng

  @IsString()   // address là bắt buộc
  address: string;
}
