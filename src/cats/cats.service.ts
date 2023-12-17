import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (await this.catRepository.findOneBy({ name: createCatDto.name })) {
      throw new BadRequestException(
        `Cat with name: '${createCatDto.name}' already exist`,
      );
    }
    return await this.entityManager.save(new Cat(createCatDto));
  }
  async remove(cat: Cat): Promise<void> {
    await this.catRepository.remove(cat);
  }
}
