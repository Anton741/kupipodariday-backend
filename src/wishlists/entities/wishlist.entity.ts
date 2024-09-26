import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';
// import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  image: string;

  // @Column()
  // @OneToMany(() => Wish, (wish) => wish.id)
  // items: Wish[];
}
