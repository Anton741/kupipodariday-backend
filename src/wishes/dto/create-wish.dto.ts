import { IsString, Length, IsUrl, IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateWishDto {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  raised: number;

  @IsString()
  @Length(1, 1024)
  description: string;

  owner: User;
}