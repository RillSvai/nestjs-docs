import { BaseEntity } from 'src/database/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Cat extends BaseEntity<Cat> {
  @Column({ unique: true })
  name: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  breed: string;

  @ManyToOne(() => User, (user) => user.cats)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
