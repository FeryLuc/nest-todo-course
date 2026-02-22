import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // ConfigService est injecté automatiquement grâce à isGlobal: true
  constructor(private configService: ConfigService) {}

  getConfig() {
    return {
      // configService.get() lit la variable depuis process.env (via le .env chargé)
      appName: this.configService.get<string>('APP_NAME', 'nest-todo-course'),
      port: this.configService.get<number>('PORT', 3000),
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
      dbHost: this.configService.get<string>('DB_HOST'),
    };
  }
}
