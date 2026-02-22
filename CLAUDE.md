# CLAUDE.md — concept/CUSTOM-DECORATOR

## Concept illustré
**Custom Parameter Decorator** avec `createParamDecorator` et `ExecutionContext`.

## Objectif pédagogique
Comprendre comment créer un décorateur de paramètre personnalisé qui extrait une donnée de la requête et l'injecte directement dans les paramètres d'une méthode de controller — exactement comme `@Param()`, `@Body()` ou `@Query()`.

## Fichiers présents

```
src/
├── main.ts
├── app.module.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── decorators/
│       └── get-user.decorator.ts     # ← LE fichier central de cette branche
├── users/
│   ├── user.entity.ts
│   ├── users.module.ts
│   └── users.service.ts
└── tasks/
    ├── task.entity.ts
    ├── tasks.module.ts
    ├── tasks.controller.ts           # Démontre @GetUser() en action
    └── tasks.service.ts
```

## Le décorateur expliqué

```typescript
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    // ctx : abstraction du protocole (HTTP, WebSocket, gRPC...)
    // switchToHttp() : précise qu'on est en HTTP
    // getRequest() : récupère l'objet Request d'Express
    const request = ctx.switchToHttp().getRequest();
    return request.user; // peuplé par JwtStrategy.validate()
  },
);
```

## Points clés à comprendre

- `createParamDecorator` : fabrique un décorateur de **paramètre de méthode** (pas de classe).
- `ExecutionContext` : abstraction multi-protocole. Toujours appeler `switchToHttp()` pour du HTTP.
- `data` : valeur passée si le décorateur est utilisé avec un argument, ex: `@GetUser('email')` → `data = 'email'`.
- `req.user` est peuplé automatiquement par Passport après `JwtStrategy.validate()`.
- Sans `@UseGuards(JwtAuthGuard)`, `req.user` serait `undefined`.
- Ce pattern évite de répéter `req.user` dans chaque méthode du controller.

## Prérequis pour que @GetUser() fonctionne
```
JwtAuthGuard → JwtStrategy.validate() → req.user = User → @GetUser() extrait req.user
```

## Ce qui est volontairement absent
- Pas de filtre/interceptor global
