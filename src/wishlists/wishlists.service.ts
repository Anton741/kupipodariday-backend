import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wisthlistRepository: Repository<Wishlist>,
    private wishesService: WishesService,
    private usersService: UsersService,
  ) {}
  async create(createWishlistDto: CreateWishlistDto, userId: string) {
    const { itemsId, ...listData } = createWishlistDto;
    const user = await this.usersService.findOne({ id: userId });
    const wishes = await this.wishesService.findByIds(itemsId);

    return this.wisthlistRepository.save({
      items: wishes,
      user,
      ...listData,
    });
  }

  findAll() {
    return this.wisthlistRepository.find();
  }

  async findOne(query: any, relations?: any) {
    const wishList = await this.wisthlistRepository.findOne({
      where: { ...query },
      relations: relations,
    });
    if (wishList) {
      return wishList;
    }

    throw new BadRequestException('Список с таким id не найден');
  }

  async updateOne(id: number, updateWisthlistDto: UpdateWishlistDto) {
    await this.findOne({ id });
    return await this.wisthlistRepository.update({ id }, updateWisthlistDto);
  }

  async removeOne(id: number) {
    await this.findOne({ id });
    return await this.wisthlistRepository.delete({ id });
  }
}
