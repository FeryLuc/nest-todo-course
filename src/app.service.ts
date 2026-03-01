import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): string {
    return "Projet back simple de todo en NestJs. But: Comprendre l'architecture général, les concepts clé de son fonctionnement et les concepts nécessaire à une mise en production.";
  }
}
