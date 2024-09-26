import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  wishes?: Wish[];
  offers?: Offer[];
  wishlists?: Wishlist[];
}
