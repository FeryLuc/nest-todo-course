import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    // relations: ['user'] : charge automatiquement la relation ManyToOne
    return this.taskRepository.find({ relations: ['user'] });
  }

  create(title: string, userId: number): Promise<Task> {
    const task = this.taskRepository.create({ title, userId });
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (task) await this.taskRepository.remove(task);
  }
}
