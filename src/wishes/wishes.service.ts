import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wisthRepository: Repository<Wish>,
  ) {}
  create(createWishDto: CreateWishDto) {
    return this.wisthRepository.save(createWishDto);
  }

  findAll() {
    return this.wisthRepository.find();
  }

  findOne(id: number, query?: any) {
    return this.wisthRepository.findOne({ where: { id, ...query } });
  }

  async updateOne(id: number, updateWisthDto: UpdateWishDto, userId?: number) {
    const wish = await this.findOne(id);
    let canUpdate = this.isOwnerOfWish(wish, userId);
    if (updateWisthDto.price) {
      canUpdate = this.haveOffers(wish);
    }
    if (canUpdate) {
      return this.wisthRepository.update({ id }, updateWisthDto);
    }
    return 'You cant update the wish';
  }

  async removeOne(id: number, userId?: number) {
    const wish = await this.findOne(id);
    const canDelete = this.isOwnerOfWish(wish, userId);
    if (canDelete) {
      return this.wisthRepository.delete({ id });
    }
    return 'You cant delete the wish';
  }

  isOwnerOfWish(wish: Wish, userId: number) {
    return wish.owner.id === userId;
  }

  haveOffers(wish: Wish) {
    return wish?.offers.length > 0;
  }

  updateCountOfAmount(wish: Wish) {
    const sumOfRaised = wish?.offers.reduce(
      (sum, item) => (sum = sum + item.amount),
      0,
    );
    this.wisthRepository.update({ id: wish.id }, { raised: sumOfRaised });
  }
}
