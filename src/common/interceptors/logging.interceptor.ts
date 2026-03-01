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

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    this.logger.log(`-> ${method} ${url}`);

    //next.handle() passe la main au handler suivant et retourne un Observable. (RxJS)
    return next.handle().pipe(
      //S'exécute après que le controller ait répondu. tap observe la réponse sans la modifier (side-effect only)
      tap(() => {
        const ms = Date.now() - now;
        this.logger.log(`<- ${method} ${url} [${ms}ms]`);
      }),
    );
  }
}
