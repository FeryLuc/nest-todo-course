# CLAUDE.md — concept/INTERCEPTORS

## Concept illustré
**NestInterceptor** — intercepter les requêtes et réponses avec RxJS (`tap`, `map`).

## Objectif pédagogique
Comprendre comment les interceptors s'insèrent dans le cycle de vie d'une requête NestJS, comment utiliser RxJS pour observer ou transformer la réponse, et la différence entre `tap` (observation) et `map` (transformation).

## Fichiers présents

```
src/
├── main.ts                                      # useGlobalInterceptors() — ordre important
├── app.module.ts
├── common/
│   └── interceptors/
│       ├── logging.interceptor.ts               # RxJS tap — log sans modifier
│       └── transform.interceptor.ts             # RxJS map — enveloppe la réponse
└── tasks/
    ├── tasks.module.ts
    ├── tasks.controller.ts                      # Routes simples pour déclencher les interceptors
    └── tasks.service.ts
```

## Points clés à comprendre

- `implements NestInterceptor` : contrat TypeScript — oblige à implémenter `intercept(context, next)`.
- `next.handle()` : déclenche l'exécution du controller et retourne un `Observable`.
- **`tap()`** : observe la valeur sans la modifier — utilisé pour les effets de bord (logs, métriques).
- **`map()`** : transforme chaque valeur émise — utilisé pour reformater la réponse.
- L'ordre dans `useGlobalInterceptors()` compte : `LoggingInterceptor` s'exécute en premier.
- Les interceptors s'exécutent **avant ET après** le controller (contrairement aux guards qui s'exécutent seulement avant).

## Cycle d'exécution
```
Requête → LoggingInterceptor (avant) → TransformInterceptor (avant) → Controller
          LoggingInterceptor (après) ← TransformInterceptor (après) ← Réponse
```

## Réponse transformée par TransformInterceptor
```json
{
  "data": <résultat du controller>,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Ce qui est volontairement absent
- Pas de base de données — données en mémoire
- Pas d'authentification
- Pas de filtre d'exception (voir branche `concept/EXCEPTION-FILTER`)
