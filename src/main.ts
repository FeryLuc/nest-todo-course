import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DocumentBuilder : configure les métadonnées globales de la doc
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API de gestion de tâches — démo Swagger')
    .setVersion('1.0')
    .addBearerAuth() // Ajoute le champ "Authorize" dans l'UI pour saisir le JWT
    .build();

  // SwaggerModule.createDocument : génère le JSON OpenAPI à partir des décorateurs
  const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule.setup : monte l'UI Swagger sur la route /api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
