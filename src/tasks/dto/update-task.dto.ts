import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

// IsOptional : le champ peut être absent (mais s'il est présent, les autres règles s'appliquent)
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
