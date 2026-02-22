import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// Le @Module regroupe controllers + providers d'un même domaine.
// AppModule est le module racine — il importe les autres modules.
@Module({
  imports: [TasksModule],
})
export class AppModule {}
