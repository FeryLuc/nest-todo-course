import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  // @InjectRepository(Task) : injecte le Repository TypeORM lié à l'entité Task
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({ where: { id } });
  }

  create(title: string): Promise<Task> {
    // .create() instancie l'objet en mémoire
    const task = this.taskRepository.create({ title });
    // .save() persiste en BDD (INSERT ou UPDATE)
    return this.taskRepository.save(task);
  }

  async update(id: number, attrs: Partial<Task>): Promise<Task | null> {
    const task = await this.findOne(id);
    if (!task) return null;
    Object.assign(task, attrs);
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    if (task) await this.taskRepository.remove(task);
  }
}
