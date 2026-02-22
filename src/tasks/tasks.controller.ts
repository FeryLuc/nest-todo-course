import {
  Controller, Get, Post, Body, Patch, Delete, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/users/user.entity';

// @ApiTags : groupe les routes sous un même label dans l'UI Swagger
@ApiTags('Tasks')
// @ApiBearerAuth : indique que ces routes nécessitent un token JWT dans le header
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @ApiOperation : décrit la route dans l'UI Swagger
  @ApiOperation({ summary: 'Récupérer toutes mes tâches' })
  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }

  @ApiOperation({ summary: 'Récupérer une tâche par son id' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tâche' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.findOne(id, user.id);
  }

  @ApiOperation({ summary: 'Créer une tâche' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto.title, user.id);
  }

  @ApiOperation({ summary: 'Modifier une tâche' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.id);
  }

  @ApiOperation({ summary: 'Supprimer une tâche' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.remove(id, user.id);
  }
}
