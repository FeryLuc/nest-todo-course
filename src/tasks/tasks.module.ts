import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// Un module déclare ses controllers et providers.
// NestJS instancie et injecte automatiquement les dépendances.
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
