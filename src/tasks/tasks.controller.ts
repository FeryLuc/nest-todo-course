import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/user.entity';

@ApiTags('Tasks') //groupe les routes sous Tasks dans Swagger
@ApiBearerAuth() //Indique que ces routes nécessite un JWT
@UseGuards(JwtAuthGuard) //protège toutes les routes du controller.
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Récupérer toutes mes tâches' })
  @Get()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user.id);
  }
  //Le Param lie l'id de l'url au paramètre id. Le ParseIntPipe est un petit pipe qui sert de validation/transformateur sur type de l'id, il est en string dans l'url et sera parsé en int et sera ensuite validé par le pipe.
  @ApiOperation({ summary: 'Récupérer une tâche par son id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.findOne(id, user.id);
  }
  @ApiOperation({ summary: 'Créer une tâche' })
  @Post()
  create(@Body() CreateTaskDto: CreateTaskDto, @GetUser() user: User) {
    //Le body de la requête est injecté et transformé en un objet CreateTaskDto
    return this.tasksService.create(CreateTaskDto.title, user.id);
  }
  @ApiOperation({ summary: 'Modifer une tâche' })
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
