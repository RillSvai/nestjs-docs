import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    const user: User | null = await this.userRepository.findOneBy({ username });
    if (user === null) {
      throw new NotFoundException('User doesn`t exist');
    }
    return user;
  }
}
