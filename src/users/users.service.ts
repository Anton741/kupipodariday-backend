import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash } from 'bcrypt';

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

  // findAll() {
  //   return this.userRepository.find({
  //     relations: ['wishes'],
  //   });
  // }

  async findOne(id: number, query: any) {
    const user = await this.userRepository.findOne({ where: { id, ...query } });
    return user;
  }

  async findMany(query: any) {
    const { username, email } = query;
    const users = await this.userRepository.find({
      where: [{ username }, { email }],
      relations: ['wishes'],
    });
    return users;
  }

  async findByUsername(username: string, withPassport = true): Promise<CreateUserDto | Omit<CreateUserDto, "password">>{
    const user = await this.userRepository.findOne({ where: { username } });
    if (!withPassport) {
      const { password, ...restData } = user;
      return restData;
    }
    return user;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto, 'UpdateUserDto');
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
