import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Le useFactory est une fonction qui recoit les dependace injectées et retourne la configuration. NestJS attend que toutes les dépendances soient prêtes avant de l'exécuter.
    //forRootAsync dépend d'autre service (configservice), config dynamique. forRoot lui non c'est statique.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Attend que le module soit instancié, prêt. Pour lire le .env (useFactory)
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, //Dev uniquement - synchronise le schéma auto
      }),
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
