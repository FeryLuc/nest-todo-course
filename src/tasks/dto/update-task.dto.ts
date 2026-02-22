import {
  IsString,
  IsBoolean,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
//Dans les DTO les décorateur de la bibli class-validator impose les règles.
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
