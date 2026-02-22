import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

// Le DTO définit la forme attendue du body de la requête.
// class-validator ajoute les règles de validation via des décorateurs.
// ValidationPipe transforme le JSON en instance de cette classe et valide chaque champ.
export class CreateTaskDto {
  @IsString()       // doit être une chaîne
  @IsNotEmpty()     // ne peut pas être vide
  @MaxLength(100)   // max 100 caractères
  title: string;
}
