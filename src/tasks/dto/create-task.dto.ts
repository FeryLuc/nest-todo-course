import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
/*
class-validator → fournit les règles de validation
class-transformer → transforme le JSON en objet TypeScript (automatique, on peut l'activer pour faire plus qu'une transfo)
ValidationPipe → orchestre tout ça dans NestJS
*/
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}
