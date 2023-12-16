import { Logger } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Cat } from './entities/cat.entity';
@EventSubscriber()
export class CatSubscriber implements EntitySubscriberInterface<Cat> {
  private readonly logger = new Logger(CatSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof Cat {
    return Cat;
  }

  beforeInsert(event: InsertEvent<Cat>): void | Promise<any> {
    this.logger.log('---BEFORE INSERT---', JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Cat>): void | Promise<any> {
    this.logger.log('---AFTER INSERT---', JSON.stringify(event.entity));
  }
}
