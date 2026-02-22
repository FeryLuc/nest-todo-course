# CLAUDE.md — concept/REPOSITORY-PATTERN

## Concept illustré
**Le Repository Pattern** avec TypeORM — toutes les méthodes du `Repository<T>`.

## Objectif pédagogique
Comprendre le pattern Repository : une couche d'abstraction entre la logique métier (service) et la persistance (BDD). Explorer les méthodes disponibles sur un `Repository<T>` TypeORM.

## Fichiers présents

```
src/
├── main.ts                  # Bootstrap minimal
├── app.module.ts            # TypeOrmModule.forRootAsync + ConfigModule
└── tasks/
    ├── task.entity.ts       # Entité Task simple
    ├── tasks.module.ts      # TypeOrmModule.forFeature([Task])
    ├── tasks.controller.ts  # Expose toutes les méthodes du service
    └── tasks.service.ts     # Démontre toutes les méthodes Repository<T>
```

## Méthodes Repository démontrées

| Méthode | Rôle |
|---|---|
| `find()` | Récupère tous les enregistrements |
| `find({ where })` | Filtre les résultats |
| `findOne({ where })` | Récupère un enregistrement ou `null` |
| `create()` | Instancie l'entité en mémoire (pas de BDD) |
| `save()` | INSERT si nouveau, UPDATE si existant |
| `remove()` | Supprime l'entité passée en paramètre |
| `count()` | Compte les enregistrements |
| `exists({ where })` | Vérifie l'existence d'un enregistrement |

## Points clés à comprendre

- Le **Repository Pattern** sépare la logique métier de la persistance — le service ne connaît pas SQL.
- `create()` ≠ `save()` : `create()` instancie en mémoire, `save()` persiste en BDD.
- `save()` fait un INSERT ou UPDATE selon si l'entité a déjà un `id`.
- `remove()` prend une **entité** (pas un id) — il faut d'abord la récupérer.
- `findOne()` retourne `null` si absent — toujours vérifier avant d'utiliser le résultat.

## Ce qui est volontairement absent
- Pas de relations entre entités
- Pas de validation des DTOs
- Pas d'authentification
