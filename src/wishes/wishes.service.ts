import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { isEmpty } from 'ramda';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async create(createWishDto: CreateWishDto, userId: number) {
    const user = await this.usersService.findOne({ id: userId });
    return this.wishRepository.save({ ...createWishDto, owner: user });
  }

  async findAll() {
    const wishes = await this.wishRepository.find({
      order: { id: 'DESC' },
    });
    if (wishes.length > 40) {
      return wishes.slice(0, 40);
    }
    return wishes;
  }

  async lastEntity() {
    const wishes = await this.wishRepository.find({
      order: { id: 'DESC' },
      relations: { owner: true, offers: { user: true, item: true } },
    });
    if (!isEmpty(wishes)) {
      if (wishes.length > 40) {
        return wishes.slice(0, 40);
      }
      return wishes;
    }
    return [];
  }

  async firstEntity() {
    const wishes = await this.wishRepository.find({
      order: { id: 'ASC' },
      relations: { owner: true, offers: { user: true, item: true } },
    });
    return wishes.length ? wishes : [];
  }

  async findOne(query?: any, relations?: any, userId?: number) {
    if (isEmpty(query)) {
      throw new BadRequestException('Передайте параметры поиска');
    }
    const wish = await this.wishRepository.findOne({
      where: { ...query },
      relations: relations,
    });
    if (wish) {
      return wish;
    }

    throw new BadRequestException('Подарок с таким id не найден');
  }

  async updateOne(id: number, updateWisthDto: UpdateWishDto, userId?: number) {
    const wish = (await this.findOne({ id }, ['owner', 'offers'])) as Wish;
    if (this.isOwnerOfWish(wish, userId)) {
      throw new BadRequestException('Вы не можете изменить чужой подарок');
    }
    if (updateWisthDto?.price && this.haveOffers(wish)) {
      throw new BadRequestException('Нельзя изменить стоймость подарка');
    }
    if (updateWisthDto?.raised) {
      throw new BadRequestException();
    }
    return await this.wishRepository.update({ id }, updateWisthDto);
  }

  async removeOne(id: number, userId?: number) {
    const wish = (await this.findOne({ id }, ['owner'])) as Wish;
    if (this.isOwnerOfWish(wish, userId)) {
      throw new BadRequestException('Вы не можете удалить чужой подарок');
    }
    await this.wishRepository.delete({ id });
    return wish;
  }

  async copyOne(wishId: number, userId: number) {
    const wish = (await this.findOne({ id: wishId }, ['owner'])) as Wish;
    if (this.isOwnerOfWish(wish, userId)) {
      throw new BadRequestException('Вы не можете скопировать свой подарок');
    }

    const { id, createdAt, updatedAt, ...wishData } = wish;

    return await this.create(wishData, userId);
  }

  isOwnerOfWish(wish: Wish, userId: number) {
    return wish.owner.id === userId;
  }

  haveOffers(wish: Wish) {
    return wish?.offers && wish?.offers?.length > 0;
  }

  async updateCountOfAmount(wishId: number, offerAmount: number) {
    await this.wishRepository.update(wishId, { raised: offerAmount });
  }

  async findByIds(ids: number[], relations?: any) {
    return Promise.all(
      ids.map(async (id) => {
        return await this.wishRepository.findOne({
          where: { id },
          relations: relations,
        });
      }),
    );
  }
}
