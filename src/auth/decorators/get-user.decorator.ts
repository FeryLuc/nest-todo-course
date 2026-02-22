import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.entity';

//createParamDecorator fabrique des decorateur qui extrait des données de la requete et les injectent directement dans les paremetres (param de methodes)
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
