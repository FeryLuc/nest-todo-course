import { Injectable } from '@nestjs/common';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] { return this.tasks; }

  create(title: string): Task {
    const task: Task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  update(id: number, attrs: Partial<Task>): Task | undefined {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return undefined;
    Object.assign(task, attrs);
    return task;
  }

  remove(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
