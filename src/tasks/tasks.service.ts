import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
//Certaines méthodes sont async d'autre non => Si je manipule la donnée à ce niveau, j'attend le résultat (donc on async). Si j'ai pas besoin de la manipuler, je le retourne normalement et je l'attendrai uniquement là où j'ai besoin de la traiter ou alors en bout de chaine ! (normalement nest, attend tout seul en bout de chaine)
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }
  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tâche #${id} introuvable`);
    }
    if (task.userId !== userId) {
      throw new ForbiddenException('Accès refusé');
    }
    return task;
  }
  create(title: string, userId: number): Promise<Task> {
    const task = this.taskRepository.create({ title, userId });
    return this.taskRepository.save(task);
  }
  async update(
    id: number,
    attrs: Partial<Task>,
    userId: number,
  ): Promise<Task> {
    const task = await this.findOne(id, userId);
    Object.assign(task, attrs);
    return this.taskRepository.save(task);
  }
  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.taskRepository.remove(task);
  }
}
