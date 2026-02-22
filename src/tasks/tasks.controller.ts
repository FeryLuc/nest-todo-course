import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get() findAll() { return this.tasksService.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.tasksService.findOne(+id); }
  @Post() create(@Body() body: { title: string }) { return this.tasksService.create(body.title); }

  // Route qui provoque une erreur non-HTTP pour tester le filtre 500
  @Get('error/crash')
  crash() {
    throw new Error('Erreur inattendue (non HTTP) — capturée par AllExceptionsFilter');
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.tasksService.remove(+id); }
}
