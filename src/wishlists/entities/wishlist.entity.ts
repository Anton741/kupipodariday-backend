import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import {
  IsArray,
  IsDateString,
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

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @CreateDateColumn()
  createdAt: Date;

  @IsDateString()
  @UpdateDateColumn()
  updatedAt: Date;

  @IsString()
  @Length(1, 200)
  @Column()
  name: string;

  @Column()
  @IsString()
  @Length(1, 1024)
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
