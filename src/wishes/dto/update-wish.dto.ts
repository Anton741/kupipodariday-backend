import { PartialType } from '@nestjs/mapped-types';
import { CreateWishDto } from './create-wish.dto';
import { Offer } from 'src/offers/entities/offer.entity';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  offers?: Offer[];
}
