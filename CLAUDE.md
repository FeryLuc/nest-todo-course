# CLAUDE.md — concept/EXCEPTIONS-HTTP

## Concept illustré
**Exceptions HTTP NestJS** : `NotFoundException`, `ForbiddenException`, `ConflictException`, `UnauthorizedException`.

## Objectif pédagogique
Comprendre comment NestJS gère les erreurs HTTP via des classes d'exception natives. Savoir quelle exception utiliser selon le cas métier, et comment elles sont automatiquement converties en réponses JSON avec le bon status code.

## Fichiers présents

```
src/
├── main.ts                  # Bootstrap minimal, sans filter global
├── app.module.ts
└── tasks/
    ├── tasks.module.ts
    ├── tasks.controller.ts  # Routes dont une dédiée aux doublons
    └── tasks.service.ts     # Chaque méthode illustre une exception différente
```

## Exceptions illustrées

| Exception | Status | Cas d'usage dans ce projet |
|---|---|---|
| `NotFoundException` | 404 | Tâche introuvable par son id |
| `UnauthorizedException` | 401 | userId absent = non authentifié |
| `ConflictException` | 409 | Doublon de titre pour le même utilisateur |
| `ForbiddenException` | 403 | Tâche trouvée mais n'appartient pas à l'utilisateur |

## Points clés à comprendre

- Toutes ces classes étendent `HttpException` de `@nestjs/common`.
- NestJS les intercepte automatiquement et retourne une réponse JSON `{ statusCode, message }`.
- **401 vs 403** : 401 = non identifié (qui es-tu ?), 403 = identifié mais accès refusé (tu n'as pas le droit).
- **404 vs 403** : retourner un 403 au lieu d'un 404 quand la ressource existe mais n'appartient pas à l'utilisateur évite de révéler son existence.
- Le message d'erreur login/password est intentionnellement identique → pas d'énumération d'utilisateurs.

## Routes de test
- `GET /tasks/:id` → 404 si inexistant
- `POST /tasks` (sans userId) → 401
- `POST /tasks/duplicate` → 409 si titre déjà existant
- `PATCH /tasks/:id` (mauvais userId) → 403
- `DELETE /tasks/:id` (mauvais userId) → 403

## Ce qui est volontairement absent
- Pas de filtre global (voir branche `concept/EXCEPTION-FILTER`)
- Pas de base de données — données en mémoire
