# CLAUDE.md — concept/MODULE-CONTROLLER-SERVICE

## Concept illustré
Le trio fondamental de NestJS : **Module / Controller / Service**.
C'est la base architecturale de toute application NestJS.

## Objectif pédagogique
Comprendre comment NestJS organise le code en modules, comment les controllers reçoivent les requêtes HTTP, et comment les services encapsulent la logique métier via l'injection de dépendances.

## Fichiers présents

```
src/
├── main.ts                  # Bootstrap minimal — NestFactory.create()
├── app.module.ts            # Module racine — importe TasksModule
└── tasks/
    ├── tasks.module.ts      # Déclare le controller et le service du domaine
    ├── tasks.controller.ts  # Reçoit les requêtes HTTP, délègue au service
    └── tasks.service.ts     # Logique métier, données en mémoire (tableau)
```

## Points clés à comprendre

- `@Module` : regroupe les controllers et providers d'un même domaine. NestJS instancie et câble tout automatiquement.
- `@Controller('tasks')` : définit le préfixe de route. Les méthodes définissent les sous-routes (`@Get`, `@Post`, etc.).
- `@Injectable()` : marque la classe comme injectable. NestJS crée un singleton et l'injecte partout où nécessaire.
- **Injection de dépendances** : le service est déclaré dans le constructeur — NestJS résout la dépendance automatiquement.
- Le module racine (`AppModule`) importe les modules enfants (`TasksModule`).

## Ce qui est volontairement absent
- Pas de base de données — les tâches sont stockées dans un tableau en mémoire
- Pas de validation (pas de DTOs, pas de ValidationPipe)
- Pas d'authentification
- Pas d'interceptors, filters ou pipes
- Pas de variables d'environnement
