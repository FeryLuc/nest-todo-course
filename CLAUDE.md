# CLAUDE.md — concept/TYPEORM-ENTITY

## Concept illustré
**TypeORM** + **Entité** : connexion à PostgreSQL et définition d'une table via une classe TypeScript.

## Objectif pédagogique
Comprendre comment NestJS se connecte à une base de données PostgreSQL via TypeORM, comment une entité mappe une classe à une table, et comment configurer la connexion dynamiquement avec `ConfigService`.

## Fichiers présents

```
src/
├── main.ts                  # Bootstrap minimal
├── app.module.ts            # TypeOrmModule.forRootAsync + ConfigModule
└── tasks/
    ├── task.entity.ts       # @Entity — mappe la classe à la table 'tasks'
    ├── tasks.module.ts      # TypeOrmModule.forFeature([Task])
    ├── tasks.controller.ts  # CRUD basique
    └── tasks.service.ts     # @InjectRepository + opérations BDD
```

## Points clés à comprendre

- `@Entity('tasks')` : mappe la classe TypeScript à la table `tasks` en BDD.
- `@PrimaryGeneratedColumn()` : colonne `id` auto-incrémentée.
- `@Column()` : mappe une propriété à une colonne. Accepte des options (`default`, `unique`, etc.).
- `TypeOrmModule.forRootAsync` : config dynamique — attend que `ConfigService` soit prêt avant d'initialiser la connexion.
- `TypeOrmModule.forFeature([Task])` : enregistre le `Repository<Task>` pour qu'il soit injectable dans le module.
- `@InjectRepository(Task)` : injecte le repository TypeORM lié à l'entité `Task`.
- `synchronize: true` : TypeORM crée/met à jour les tables automatiquement — **dev uniquement**.
- `.create()` instancie l'objet en mémoire. `.save()` le persiste en BDD.

## Ce qui est volontairement absent
- Pas de relations entre entités (voir branche `concept/RELATIONS-ORM`)
- Pas de validation des DTOs
- Pas d'authentification
- `synchronize: true` — ne jamais utiliser en production
