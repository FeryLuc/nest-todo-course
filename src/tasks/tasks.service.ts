import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

interface Task { id: number; title: string; done: boolean; userId: number; }

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] { return this.tasks; }

  // NotFoundException (404) : ressource introuvable
  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Tâche #${id} introuvable`);
    return task;
  }

  create(title: string, userId: number): Task {
    // UnauthorizedException (401) : userId manquant = non authentifié
    if (!userId) throw new UnauthorizedException('Vous devez être connecté pour créer une tâche');
    const task: Task = { id: this.nextId++, title, done: false, userId };
    this.tasks.push(task);
    return task;
  }

  // ConflictException (409) : doublon détecté
  createAndCheckDuplicate(title: string, userId: number): Task {
    const exists = this.tasks.some((t) => t.title === title && t.userId === userId);
    if (exists) throw new ConflictException(`Une tâche avec le titre "${title}" existe déjà`);
    return this.create(title, userId);
  }

  // ForbiddenException (403) : ressource trouvée mais accès refusé
  update(id: number, userId: number, attrs: Partial<Task>): Task {
    const task = this.findOne(id);
    if (task.userId !== userId) throw new ForbiddenException('Vous ne pouvez pas modifier cette tâche');
    Object.assign(task, attrs);
    return task;
  }

  remove(id: number, userId: number): void {
    const task = this.findOne(id);
    if (task.userId !== userId) throw new ForbiddenException('Vous ne pouvez pas supprimer cette tâche');
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
