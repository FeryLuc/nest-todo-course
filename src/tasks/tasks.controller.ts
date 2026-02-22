import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() { return this.tasksService.findAll(); }

  @Post()
  create(@Body() body: { title: string; userId: number }) {
    return this.tasksService.create(body.title, body.userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.tasksService.remove(id); }
}
