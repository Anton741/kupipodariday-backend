import { IsEmail, IsNotEmpty, IsString, Length, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(2, 200)
  about: string;

  @IsUrl()
  avatar: string;
}
