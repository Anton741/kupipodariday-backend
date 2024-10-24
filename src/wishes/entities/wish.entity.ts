import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import {
  IsArray,
  IsDateString,
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

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @CreateDateColumn()
  createdAt: Date;

  @IsDateString()
  @UpdateDateColumn()
  updatedAt: Date;

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
  @ManyToMany(() => Wishlist, (list) => list.items)
  wishlists: Wishlist[];

  @Column({ type: 'int', default: 0 })
  @IsInt()
  copied: number;
}
