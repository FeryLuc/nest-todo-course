import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch() sans argument : intercepte TOUTES les exceptions (HTTP et non-HTTP).
// Avec @Catch(HttpException) : n'intercepterait que les HttpExceptions.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // ArgumentsHost : abstraction du contexte d'exécution (HTTP, WebSocket, gRPC...)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Détermine le status : HttpException → son propre status, sinon 500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Détermine le message : HttpException → son message, sinon générique
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Erreur interne du serveur';

    this.logger.error(`[${request.method}] ${request.url} -> ${status}`);

    // Réponse JSON uniforme pour toutes les erreurs de l'application
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
