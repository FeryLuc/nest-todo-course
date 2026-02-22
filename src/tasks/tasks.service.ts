import { Injectable } from '@nestjs/common';

interface Task { id: number; title: string; done: boolean; }

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
}
