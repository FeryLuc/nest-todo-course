import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      //map sur Observable => prend la réponse l'englobe dans un objet dans la propriété data et ajoute une 2e prop, la date.
      map((data) => ({
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
