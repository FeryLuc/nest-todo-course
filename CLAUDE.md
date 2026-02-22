# CLAUDE.md — concept/EXCEPTION-FILTER

## Concept illustré
**ExceptionFilter** global avec `@Catch()` — intercepter et uniformiser toutes les exceptions en une réponse JSON cohérente.

## Objectif pédagogique
Comprendre comment créer un filtre d'exception global qui capture toutes les erreurs de l'application (HTTP et non-HTTP) et retourne toujours une réponse JSON structurée et uniforme.

## Fichiers présents

```
src/
├── main.ts                              # useGlobalFilters(new AllExceptionsFilter())
├── app.module.ts
├── common/
│   └── filters/
│       └── http-exception.filter.ts    # Le filtre global @Catch()
└── tasks/
    ├── tasks.module.ts
    ├── tasks.controller.ts             # Route GET /tasks/error/crash pour tester une erreur 500
    └── tasks.service.ts
```

## Points clés à comprendre

- `@Catch()` sans argument : capture **toutes** les exceptions (HTTP et non-HTTP).
- `@Catch(HttpException)` : ne capturerait que les exceptions HTTP.
- `implements ExceptionFilter` : contrat TypeScript — oblige à implémenter `catch(exception, host)`.
- `ArgumentsHost` : abstraction du contexte (HTTP, WebSocket, gRPC...). `switchToHttp()` précise le protocole.
- `exception instanceof HttpException` : distingue les erreurs HTTP (gérées) des erreurs inattendues (500).
- `useGlobalFilters()` dans `main.ts` : applique le filtre à toute l'application.

## Format de réponse uniforme retourné
```json
{
  "statusCode": 404,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/tasks/99",
  "message": { ... }
}
```

## Routes de test
- `GET /tasks/99` → 404 (NotFoundException capturée)
- `GET /tasks/error/crash` → 500 (Error native capturée)

## Ce qui est volontairement absent
- Pas de base de données — données en mémoire
- Pas d'authentification
- Pas d'interceptors (voir branche `concept/INTERCEPTORS`)
