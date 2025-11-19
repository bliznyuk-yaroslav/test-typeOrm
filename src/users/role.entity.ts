import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
