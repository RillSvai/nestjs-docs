import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat: Cat = new Cat(createCatDto);
    if (await this.catRepository.findOneBy({ name: cat.name })) {
      throw new BadRequestException(
        `Cat with name: '${cat.name}' already exist`,
      );
    }
    return await this.entityManager.save(cat);
  }
  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}
