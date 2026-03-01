import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService], //On exporte pour que le authModule puisse l'injecter dans l'authService.
  //Les users ne sont pas une ressources exploitable par les utilisateurs. On utilise le module users pour gérer la création et la connection d'un user.
  //L'user Module gère la gestion db des users mais n'expose aucune route. L'auth module utilise le service users pour faire son propre travail. Création et login avec décryptage.
})
export class UsersModule {}
