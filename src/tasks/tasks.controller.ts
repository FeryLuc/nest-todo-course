import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

// @Controller définit le préfixe de route.
// Le service est injecté via le constructeur (Dependency Injection).
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() body: { title: string }) {
    return this.tasksService.create(body.title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; done?: boolean }) {
    return this.tasksService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
