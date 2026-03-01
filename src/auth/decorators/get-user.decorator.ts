import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.entity';

//createParamDecorator fabrique des decorateurs qui extrait des données de la requête et les injectent directement dans les paramètres (param de methodes)
export const GetUser = createParamDecorator(
  //ExecutionContext est une interface qui représente le context complet d'une requête en cours de traitement.
  //Il donne 2 niveaux d'informations: la requête (req ou res) et le handler (quel ctrl, méthode, leur noms).
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest(); //retourne l'objet request (Express) du protocole http.
    return request.user;
  },
);
