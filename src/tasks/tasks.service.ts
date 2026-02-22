import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }

  create(title: string, userId: number): Promise<Task> {
    const task = this.taskRepository.create({ title, userId });
    return this.taskRepository.save(task);
  }
}
