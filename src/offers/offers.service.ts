import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
    private usersService: UsersService,
  ) {}

  findAll() {
    return this.offerRepository.find({ relations: { item: true, user: true } });
  }

  findOne(id: number, query: any, relations?: any) {
    return this.offerRepository.findOne({
      where: { id, ...query },
      relations: relations,
    });
  }

  async create(createOffer: CreateOfferDto, userId: number) {
    const { itemId, amount, ...offerData } = createOffer;
    const wish = (await this.wishesService.findOne({ id: itemId }, [
      'owner',
    ])) as Wish;
    const user = await this.usersService.findOne({ id: userId });
    if (userId === wish.owner.id) {
      throw new BadRequestException({
        message: `Вы не можете вносить деньги на свой подарок`,
      });
    }

    const raised = wish.raised + amount;
    if (wish.raised > wish.price) {
      throw new BadRequestException({
        message: `Сбор средств окончен`,
      });
    }
    if (raised > wish.price) {
      throw new BadRequestException({
        message: `Сумма заявки больше чем осталось собрать`,
        raised: raised,
        price: wish.price,
      });
    }
    wish.raised += amount;

    await this.wishesService.updateCountOfAmount(itemId, raised);

    return this.offerRepository.save({
      ...offerData,
      amount,
      user,
      item: wish,
    });
  }

  // removeOne(id: number) {
  //   return this.offerRepository.delete({ id });
  // }

  // updateOne(id: number, updateOfferDto: UpdateOfferDto) {
  //   return this.offerRepository.update({ id }, updateOfferDto);
  // }

  // isOwnerOfWish(offer: CreateOfferDto, wish: CreateWishDto) {
  //   return offer.user.id === wish.owner.id;
  // }

  // isOfferClosed(offer: CreateOfferDto) {
  //   if (offer.item.price >= offer.item.raised) {
  //     return true;
  //   }
  //   return false;
  //   ``;
  // }
}
