import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../nestjs-docs/src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Cat } from 'src/cats/entities/cat.entity';

config();
const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('PG_HOST'),
  port: configService.getOrThrow('PG_PORT'),
  database: configService.getOrThrow('PG_DATABASE'),
  username: configService.getOrThrow('PG_USERNAME'),
  entities: [User, Cat],
  migrations: ['migrations/**'],
});
