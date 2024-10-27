import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Type } from 'class-transformer';
import { BaseEntity } from 'src/share/baseEntity';

@Entity()
export class Wishlist extends BaseEntity {
  @IsString()
  @Length(1, 200)
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Wish)
  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  items: Wish[];
}
