import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async createRandom(): Promise<User> {
    const slug = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6)}`;
    const user = this.usersRepo.create({
      name: `User_${slug}`,
      email: `user_${slug}@example.com`,
    });
    return this.usersRepo.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
  async findOne(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
