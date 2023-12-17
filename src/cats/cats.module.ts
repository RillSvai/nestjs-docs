import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CatSubscriber } from './cat.subscriber';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), AuthModule],
  controllers: [CatsController],
  providers: [CatsService, CatSubscriber],
})
export class CatsModule {}
