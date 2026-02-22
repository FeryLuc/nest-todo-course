# CLAUDE.md — concept/CONFIG-MODULE

## Concept illustré
**ConfigModule** et **ConfigService** de `@nestjs/config` pour gérer les variables d'environnement.

## Objectif pédagogique
Comprendre comment NestJS charge et expose les variables d'environnement via le fichier `.env`, et comment les injecter proprement dans n'importe quel service via `ConfigService`.

## Fichiers présents

```
src/
├── main.ts          # Bootstrap minimal
├── app.module.ts    # ConfigModule.forRoot({ isGlobal: true })
├── app.controller.ts # Route GET /config — appelle le service
└── app.service.ts   # Injecte ConfigService et lit les variables
```

## Points clés à comprendre

- `ConfigModule.forRoot()` : charge le `.env` au démarrage de l'app.
- `isGlobal: true` : rend le module disponible dans toute l'app sans avoir à le ré-importer dans chaque module.
- `ConfigService.get<T>('CLE')` : lit une variable d'environnement typée. Le 2e argument est la valeur par défaut.
- `ConfigService` s'injecte comme n'importe quel service NestJS via le constructeur.
- `forRoot` (statique) vs `forRootAsync` (dynamique, pour dépendre d'autres services) — ici on utilise `forRoot` car pas de dépendance externe.

## Variables d'environnement lues
```
APP_NAME   # Nom de l'application
PORT       # Port du serveur
NODE_ENV   # Environnement (development, production...)
DB_HOST    # Exemple de variable BDD
```

## Ce qui est volontairement absent
- Pas de base de données
- Pas de validation du schéma des variables d'env au démarrage
- Pas d'authentification
