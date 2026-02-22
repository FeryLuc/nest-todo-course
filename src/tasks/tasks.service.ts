import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  // PAS de async : on retourne directement la Promise.
  // NestJS sait résoudre une Promise retournée par un controller.
  // Inutile d'async/await si on ne manipule pas le résultat localement.
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // PAS de async : même raison — la Promise est retournée directement.
  create(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return this.taskRepository.save(task);
  }

  // async NÉCESSAIRE : on doit awaiter findOne pour tester si la tâche existe
  // avant de lancer une exception. On a besoin de la valeur pour prendre une décision.
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tâche #${id} introuvable`);
    }
    return task;
  }

  // async NÉCESSAIRE : on doit awaiter findOne (dépendance sur le résultat),
  // puis awaiter save après modification.
  async update(id: number, attrs: Partial<Task>): Promise<Task> {
    const task = await this.findOne(id); // dépend du résultat de findOne
    Object.assign(task, attrs);
    return this.taskRepository.save(task); // Promise retournée directement (pas d'await nécessaire ici)
  }

  // async NÉCESSAIRE : on doit awaiter findOne, puis awaiter remove.
  // remove() retourne void donc pas besoin de retourner la Promise.
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
