import { Body, Controller, Delete, ParseIntPipe, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { PositiveNumberPipe } from 'src/global-pipes/positive-number.pipe.';
import { CatByIdPipe } from './pipes/cat-by-id.pipe';

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
  async findOne(
    @Param('id', ParseIntPipe, new PositiveNumberPipe(), CatByIdPipe) cat: Cat,
  ): Promise<Cat> {
    return cat;
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe, new PositiveNumberPipe(), CatByIdPipe) cat: Cat,
  ) {
    this.catService.remove(cat);
  }
}
