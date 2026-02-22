import { Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() { return this.tasksService.findAll(); }

  @Get('done')
  findDone() { return this.tasksService.findDone(); }

  @Get('count')
  count() { return this.tasksService.count(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.tasksService.findOne(id); }

  @Get(':id/exists')
  exists(@Param('id', ParseIntPipe) id: number) { return this.tasksService.existsById(id); }

  @Post()
  create(@Body() body: { title: string }) { return this.tasksService.create(body.title); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: { title?: string; done?: boolean }) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.tasksService.remove(id); }
}
