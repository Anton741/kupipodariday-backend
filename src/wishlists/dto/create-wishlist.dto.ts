import { IsString, Length, IsUrl } from 'class-validator';
// import { Wish } from 'src/wishes/entities/wish.entity';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsString()
  @Length(1, 1024)
  description: string;

  @IsUrl()
  image: string;

  // items: Wish[];
}
