import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catService.create(createCatDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cat> {
    return await this.catService.findOne(id);
  }
}
