import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: { name: string }) { return this.usersService.create(body.name); }

  @Get()
  findAll() { return this.usersService.findAll(); }

  // GET /users/:id/tasks → retourne le user avec ses tasks chargées
  @Get(':id/tasks')
  findWithTasks(@Param('id', ParseIntPipe) id: number) { return this.usersService.findOneWithTasks(id); }
}
