import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(name: string): Promise<User> {
    const user = this.userRepository.create({ name });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // relations: ['tasks'] : charge la relation OneToMany dans la même requête (JOIN)
  findOneWithTasks(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }
}
