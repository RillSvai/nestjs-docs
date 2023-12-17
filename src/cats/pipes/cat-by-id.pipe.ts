import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Cat } from '../entities/cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatByIdPipe implements PipeTransform<number, Promise<Cat>> {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}
  async transform(value: number): Promise<Cat> {
    const cat: Cat | null = await this.catRepository.findOneBy({ id: value });
    if (!cat) {
      throw new NotFoundException('Cat doesn`t exist');
    }
    return cat;
  }
}
