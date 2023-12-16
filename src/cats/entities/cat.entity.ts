import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Cat extends BaseEntity<Cat> {
  @Column({ unique: true })
  name: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  breed: string;
}
