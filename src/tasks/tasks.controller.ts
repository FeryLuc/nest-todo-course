import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { TasksService } from './tasks.service';
import { User } from 'src/users/user.entity';

// @UseGuards(JwtAuthGuard) : protège toutes les routes du controller.
// Une requête sans token JWT valide reçoit une 401 Unauthorized.
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @Post()
  create(@Body() body: { title: string }, @GetUser() user: User) {
    return this.tasksService.create(body.title, user.id);
  }
}
