import {
  IsString,
  Length,
  IsUrl,
  IsNumber,
  IsNumberString,
} from 'class-validator';
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
  raised: number = 0;

  @IsString()
  @Length(1, 1024)
  description: string;

  owner: User;
}
