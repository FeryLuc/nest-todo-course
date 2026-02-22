import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { TasksService } from './tasks.service';
import { User } from 'src/users/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @GetUser() injecte l'objet User complet depuis req.user
  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  // On peut accéder à n'importe quelle propriété du user directement
  @Get('me')
  getMe(@GetUser() user: User) {
    return { id: user.id, email: user.email };
  }

  @Post()
  create(@Body() body: { title: string }, @GetUser() user: User) {
    return this.tasksService.create(body.title, user.id);
  }
}
