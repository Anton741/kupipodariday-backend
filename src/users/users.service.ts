import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash } from 'bcrypt';
import { isEmpty } from 'ramda';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    return this.userRepository.save({ password: hashPassword, ...userData });
  }

  async findOne(query: any, relations?: any) {
    if (isEmpty(query)) {
      throw new BadRequestException('Передайте параметры поиска');
    }
    const user = await this.userRepository.findOne({
      where: { ...query },
      relations: relations,
    });
    if (user) {
      const { password, ...restData } = user;
      return restData;
    }
    throw new BadRequestException('Пользователь не найден');
  }

  async findMany({ query }: { query: string }, relations?: any) {
    let users;
    if (isEmpty(query)) {
      users = await this.userRepository.find();
    } else {
      users = await this.userRepository.find({
        where: { username: query },
        relations: relations,
      });
    }

    if (users) {
      return users.map((user) => {
        const { password, ...restData } = user;
        return restData;
      });
    }
    return [];
  }

  async findByUsername(
    username: string,
    withPassport = true,
    relations = [],
  ): Promise<UpdateUserDto | Omit<UpdateUserDto, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: relations,
    });
    if (user) {
      if (!withPassport) {
        const { password, ...restData } = user;
        return restData;
      }
      return user;
    }

    throw new BadRequestException('Пользователь не найден');
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto?.password) {
      const { password, ...userData } = updateUserDto;
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      const user = await this.userRepository.update(
        { id },
        { password: hashPassword, ...userData },
      );
      return user;
    }
    const user = await this.userRepository.update({ id }, updateUserDto);

    return user;
  }

  removeOne(id: number) {
    return this.userRepository.delete({ id });
  }
}
