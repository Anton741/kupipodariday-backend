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
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @CreateDateColumn()
  createdAt: Date;

  @IsDateString()
  @UpdateDateColumn()
  updatedAt: Date;

  @IsString()
  @Column()
  username: string;

  @Column()
  @IsString()
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsString()
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(2, 8)
  password: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Offer)
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Wishlist)
  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists: Wishlist[];
}
