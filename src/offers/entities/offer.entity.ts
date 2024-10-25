import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntity } from 'src/share/baseEntity';

@Entity()
export class Offer extends BaseEntity {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => User)
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Wish)
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  hidden: boolean;
}
