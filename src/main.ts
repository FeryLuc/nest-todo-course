import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe global : valide automatiquement tous les @Body() contre leurs DTOs
  // whitelist: true → ignore silencieusement les champs non déclarés dans le DTO
  // forbidNonWhitelisted: true → retourne une erreur 400 si un champ inconnu est envoyé
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
