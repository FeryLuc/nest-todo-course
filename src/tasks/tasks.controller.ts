import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get() findAll() { return this.tasksService.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.tasksService.findOne(+id); }

  @Post()
  create(@Body() body: { title: string; userId: number }) {
    return this.tasksService.create(body.title, body.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; done?: boolean; userId: number }) {
    return this.tasksService.update(+id, body.userId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: { userId: number }) {
    return this.tasksService.remove(+id, body.userId);
  }

  // Route spéciale pour déclencher une ConflictException
  @Post('duplicate')
  createDuplicate(@Body() body: { title: string; userId: number }) {
    return this.tasksService.createAndCheckDuplicate(body.title, body.userId);
  }
}
