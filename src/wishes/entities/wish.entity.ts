import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmptyObject,
  IsObject,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Type } from 'class-transformer';
import { BaseEntity } from 'src/share/baseEntity';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @Length(1, 200)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsInt()
  price: number;

  @Column({
    default: 0,
  })
  @IsInt()
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  owner: User;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Offer)
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Wishlist)
  @JoinTable()
  @ManyToMany(() => Wishlist, (list) => list.items)
  wishlists: Wishlist[];

  @Column({ type: 'int', default: 0 })
  @IsInt()
  copied: number;
}
