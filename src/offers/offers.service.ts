import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}
  create(offer: CreateOfferDto) {
    const canCreate = !(this.isOwnerOfWish(offer) && this.isOfferClosed(offer));
    if (canCreate) {
      if (offer.hidden) {
        const { user, ...offerData } = offer;
        return this.offerRepository.save(offerData);
      }
      return this.offerRepository.save(offer);
    }
    return 'Cant be created';
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(id: number, query: any) {
    return this.offerRepository.findOne({ where: { id, ...query } });
  }

  updateOne(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update({ id }, updateOfferDto);
  }

  removeOne(id: number) {
    return this.offerRepository.delete({ id });
  }

  isOwnerOfWish(offer: CreateOfferDto) {
    return offer.user.id === offer.item.owner.id;
  }

  isOfferClosed(offer: CreateOfferDto) {
    if (offer.item.price >= offer.item.raised) {
      return true;
    }
    return false;
    ``;
  }
}
