# CLAUDE.md — concept/DTO-VALIDATION-PIPE

## Concept illustré
**DTOs** (Data Transfer Objects) + **class-validator** + **ValidationPipe**.

## Objectif pédagogique
Comprendre comment valider et typer les données entrantes dans NestJS : définir un DTO avec des règles de validation, et laisser `ValidationPipe` orchestrer automatiquement la validation à chaque requête.

## Fichiers présents

```
src/
├── main.ts                        # ValidationPipe global (whitelist + forbidNonWhitelisted)
├── app.module.ts                  # Module racine minimal
└── tasks/
    ├── tasks.module.ts
    ├── tasks.controller.ts        # @Body() typé avec les DTOs
    ├── tasks.service.ts           # Données en mémoire
    └── dto/
        ├── create-task.dto.ts     # @IsString, @IsNotEmpty, @MaxLength
        └── update-task.dto.ts     # @IsOptional, @IsBoolean
```

## Points clés à comprendre

- **DTO** : classe TypeScript qui définit la forme attendue du body d'une requête.
- `class-validator` : fournit les décorateurs de validation (`@IsString`, `@IsNotEmpty`, etc.).
- `class-transformer` : transforme le JSON brut en instance de la classe DTO (automatique avec `ValidationPipe`).
- `ValidationPipe` : orchestre validation + transformation. Retourne une erreur `400` si les règles ne sont pas respectées.
- `whitelist: true` : ignore silencieusement les champs non déclarés dans le DTO.
- `forbidNonWhitelisted: true` : retourne une erreur `400` si un champ inconnu est envoyé.
- `@IsOptional()` : le champ peut être absent, mais s'il est présent les autres règles s'appliquent quand même.

## Chaîne de traitement
```
Requête JSON → class-transformer (instancie le DTO) → class-validator (valide) → Controller
```

## Ce qui est volontairement absent
- Pas de base de données — données en mémoire
- Pas d'authentification
- Pas de `@ApiProperty()` Swagger sur les DTOs
