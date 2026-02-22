import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Retourne le nom de l'app et le port depuis les variables d'environnement
  @Get('config')
  getConfig() {
    return this.appService.getConfig();
  }
}
