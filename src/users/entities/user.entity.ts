import { Cat } from 'src/cats/entities/cat.entity';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity<User> {
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Cat, (cat) => cat.user)
  cats: Cat[];
}
