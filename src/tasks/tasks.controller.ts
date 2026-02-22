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

@ApiTags('Tasks') //groupes les routes sous Tasks dans Swagger
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
  //Le Param lie l'id de l'url au parametre id. Le ParseIntPipe est une petit pipe qui sert de validation/transformateur su type de l'id, il est en string dans l'url et sera parser en int et sera ensuite valider par le pipe.
  @ApiOperation({ summary: 'Récupérer une tâche par son id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.findOne(id, user.id);
  }
  @ApiOperation({ summary: 'Créer une tâche' })
  @Post()
  create(@Body() CreateTaskDto: CreateTaskDto, @GetUser() user: User) {
    //Le body de la requete est injecté et ransformé en un objet CreateTaskDto
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
