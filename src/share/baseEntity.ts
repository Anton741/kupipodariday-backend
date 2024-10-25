import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEmail,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Type } from 'class-transformer';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @CreateDateColumn()
  createdAt: Date;

  @IsDateString()
  @UpdateDateColumn()
  updatedAt: Date;
}
