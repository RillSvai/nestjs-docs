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
  async findOne(id: number): Promise<Cat> {
    if (id <= 0) {
      throw new BadRequestException('Invalid id');
    }
    const cat: Cat | null = await this.catRepository.findOneBy({ id });
    if (cat === null) {
      throw new NotFoundException('Cat doesn`t exist');
    }
    return cat;
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
