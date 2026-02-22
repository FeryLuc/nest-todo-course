import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'path';

@Catch() //sans argument = intercepte toutes les exceptions de l'app
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    //On récupère les objets request et response depuis le context HTTP
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    //On vérifie le type d'erreur. Si c'est une HttpException on récupère son status code sinon on retourne 500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    //idem pour le message. Si HttpException => on récupère le message. sinon message générique
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erreur interne du serveur';

    //On log l'erreur dans la console du serveur pour débug
    this.logger.error(`[${request.method}] ${request.url} -> ${status}`);

    //On renvoie une réponse JSON uniforme pour toutes les erreurs.
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
