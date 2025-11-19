import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,
  ) {}

  async onModuleInit(): Promise<void> {
    const existingRoles = await this.rolesRepo.find();
    if (existingRoles.length === 0) {
      const adminRole = this.rolesRepo.create({ name: 'admin' });
      const userRole = this.rolesRepo.create({ name: 'user' });
      await this.rolesRepo.save([adminRole, userRole]);
    }
  }

  async createRandom(): Promise<User> {
    const slug = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6)}`;
    const role = await this.rolesRepo.findOne({ where: { name: 'user' } });
    if (!role) throw new Error('Default role not found');
    const user = this.usersRepo.create({
      name: `User_${slug}`,
      email: `user_${slug}@example.com`,
      role,
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
