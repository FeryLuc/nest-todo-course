import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

// Le Repository Pattern : le repository est la seule couche qui touche à la BDD.
// Le service orchestre la logique métier via le repository.
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  // find() : récupère tous les enregistrements (avec options de filtre)
  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // find() avec where : filtre les résultats
  findDone(): Promise<Task[]> {
    return this.taskRepository.find({ where: { done: true } });
  }

  // findOne() : récupère UN enregistrement ou null
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Tâche #${id} introuvable`);
    return task;
  }

  // create() + save() : instancie l'entité puis persiste (INSERT)
  create(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return this.taskRepository.save(task);
  }

  // save() sur entité existante : met à jour (UPDATE)
  async update(id: number, attrs: Partial<Task>): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, attrs);
    return this.taskRepository.save(task);
  }

  // remove() : supprime l'entité passée en paramètre
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  // count() : compte les enregistrements
  count(): Promise<number> {
    return this.taskRepository.count();
  }

  // exists() : vérifie l'existence d'un enregistrement
  existsById(id: number): Promise<boolean> {
    return this.taskRepository.exists({ where: { id } });
  }
}
