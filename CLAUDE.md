# CLAUDE.md — concept/SWAGGER

## Concept illustré
**Documentation API avec @nestjs/swagger** — `DocumentBuilder`, `SwaggerModule`, `@ApiTags`, `@ApiBearerAuth`, `@ApiOperation`, `@ApiParam`.

## Objectif pédagogique
Comprendre comment générer automatiquement une documentation API interactive (OpenAPI/Swagger) à partir des décorateurs NestJS, et comment ajouter des métadonnées descriptives aux routes.

## Fichiers présents

```
src/
├── main.ts                       # DocumentBuilder + SwaggerModule.setup → /api
├── app.module.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts        # @ApiTags('Auth') implicite
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── guards/jwt-auth.guard.ts
│   └── decorators/get-user.decorator.ts
├── users/
│   ├── user.entity.ts
│   ├── users.module.ts
│   └── users.service.ts
└── tasks/
    ├── task.entity.ts
    ├── tasks.module.ts
    ├── tasks.controller.ts       # Tous les décorateurs Swagger démontrés
    ├── tasks.service.ts
    └── dto/
        ├── create-task.dto.ts
        └── update-task.dto.ts
```

## Points clés à comprendre

- `DocumentBuilder` : configure les métadonnées globales (titre, description, version, auth).
- `addBearerAuth()` : ajoute le bouton "Authorize" dans l'UI pour saisir le JWT.
- `SwaggerModule.createDocument()` : génère le JSON OpenAPI en lisant tous les décorateurs.
- `SwaggerModule.setup('api', app, document)` : monte l'UI sur `/api`.
- `@ApiTags('Tasks')` : groupe les routes sous un label dans l'UI.
- `@ApiBearerAuth()` : indique que les routes nécessitent un token — affiche le cadenas dans l'UI.
- `@ApiOperation({ summary })` : description courte de la route.
- `@ApiParam()` : documente un paramètre de route (`:id`).

## Accès
- UI interactive : `http://localhost:3000/api`
- JSON OpenAPI : `http://localhost:3000/api-json`

## Ce qui est volontairement absent
- `@ApiProperty()` sur les entités et DTOs (décorerait les champs dans la doc)
- Swagger conditionné à `NODE_ENV !== 'production'` (présent dans `main` mais retiré ici pour simplifier)
