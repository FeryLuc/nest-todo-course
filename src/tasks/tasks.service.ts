import { Injectable } from '@nestjs/common';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

// @Injectable marque la classe comme un provider injectable.
// NestJS le crée une seule fois (singleton) et l'injecte partout où besoin.
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  create(title: string): Task {
    const task: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  update(id: number, attrs: Partial<Task>): Task | undefined {
    const task = this.findOne(id);
    if (!task) return undefined;
    Object.assign(task, attrs);
    return task;
  }

  remove(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
