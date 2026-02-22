import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.entity';

// createParamDecorator : fabrique un décorateur de paramètre de méthode.
// Il permet d'extraire une donnée de la requête et de l'injecter directement
// comme paramètre dans une méthode de controller (comme @Param, @Body, @Query).
//
// data : valeur passée au décorateur si utilisé ainsi @GetUser('email') → data = 'email'
// ctx  : le contexte d'exécution — abstraction du protocole (HTTP, WebSocket, gRPC...)
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    // switchToHttp() : on précise qu'on est dans un contexte HTTP
    // getRequest() : récupère l'objet Request d'Express
    const request = ctx.switchToHttp().getRequest();

    // req.user est peuplé automatiquement par Passport après validation du JWT.
    // JwtStrategy.validate() retourne le user → Passport l'attache à req.user.
    return request.user;
  },
);
