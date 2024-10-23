import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @CreateDateColumn()
  createdAt: Date;

  @IsDateString()
  @UpdateDateColumn()
  updatedAt: Date;

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
