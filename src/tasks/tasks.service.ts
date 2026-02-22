import { Injectable, NotFoundException } from '@nestjs/common';

interface Task { id: number; title: string; done: boolean; }

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] { return this.tasks; }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Tâche #${id} introuvable`);
    return task;
  }

  create(title: string): Task {
    const task: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  remove(id: number): void {
    this.findOne(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
