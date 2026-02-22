import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //ignore les champs non déclaré dans le dto
      forbidNonWhitelisted: true, //retourne une erreur si champ inconnu
    }),
  );

  //Filters
  app.useGlobalFilters(new AllExceptionsFilter());

  //Interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  //Configuration Swagger
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Todo API')
      .setDescription('API de gestion de tâches')
      .setVersion('1.0')
      .addBearerAuth() //Ajoute le support JWT dans Swagger.
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // accessible sur /api
  }

  //Démarrage serveur
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
