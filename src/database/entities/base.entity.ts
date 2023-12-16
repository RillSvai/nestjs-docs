import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity<TEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<TEntity>) {
    Object.assign(this, entity);
  }
}
