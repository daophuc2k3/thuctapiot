import { IsString, IsOptional,IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
