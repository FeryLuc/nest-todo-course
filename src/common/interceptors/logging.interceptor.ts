import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  // intercept() reçoit le contexte et le CallHandler (suite de la chaîne).
  // Il doit retourner un Observable — c'est le flux de la réponse.
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    this.logger.log(`-> ${method} ${url}`);

    // next.handle() déclenche l'exécution du controller et retourne un Observable.
    // tap() observe la réponse sans la modifier (effets de bord uniquement).
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - now;
        this.logger.log(`<- ${method} ${url} [${ms}ms]`);
      }),
    );
  }
}
