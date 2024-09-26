import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wisthlistRepository: Repository<Wishlist>,
  ) {}
  create(createWishlistDto: CreateWishlistDto) {
    return this.wisthlistRepository.save(createWishlistDto);
  }

  findAll() {
    return this.wisthlistRepository.find();
  }

  findOne(id: number, query: any) {
    return this.wisthlistRepository.findOne({ where: { id, ...query } });
  }

  updateOne(id: number, updateWisthlistDto: UpdateWishlistDto) {
    return this.wisthlistRepository.update({ id }, updateWisthlistDto);
  }

  removeOne(id: number) {
    return this.wisthlistRepository.delete({ id });
  }
}
