import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get() findAll() { return this.tasksService.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.tasksService.findOne(id); }
  @Post() create(@Body() body: { title: string }) { return this.tasksService.create(body.title); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() body: { title?: string; done?: boolean }) { return this.tasksService.update(id, body); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.tasksService.remove(id); }
}
