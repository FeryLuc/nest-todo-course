# CLAUDE.md — concept/RELATIONS-ORM

## Concept illustré
**Relations TypeORM** : `@OneToMany` et `@ManyToOne` entre deux entités.

## Objectif pédagogique
Comprendre comment modéliser une relation entre deux entités TypeORM, comment TypeORM génère les clés étrangères, et comment charger les données liées via `relations`.

## Fichiers présents

```
src/
├── main.ts
├── app.module.ts              # TasksModule + UsersModule
├── users/
│   ├── user.entity.ts         # @OneToMany → possède plusieurs Tasks
│   ├── users.module.ts
│   ├── users.controller.ts    # GET /users/:id/tasks → charge la relation
│   └── users.service.ts       # findOneWithTasks() avec relations: ['tasks']
└── tasks/
    ├── task.entity.ts         # @ManyToOne → appartient à un User + @Column userId
    ├── tasks.module.ts
    ├── tasks.controller.ts
    └── tasks.service.ts       # find() avec relations: ['user']
```

## Points clés à comprendre

- `@OneToMany(() => Task, (task) => task.user)` : un User a plusieurs Tasks. La propriété inverse est `task.user`.
- `@ManyToOne(() => User, (user) => user.tasks)` : une Task appartient à un User. La propriété inverse est `user.tasks`.
- TypeORM crée automatiquement la colonne FK (`userId`) grâce à `@ManyToOne`.
- `@Column() userId` : colonne FK déclarée explicitement pour pouvoir filtrer sans charger la relation.
- `relations: ['tasks']` dans `findOne()` : charge la relation via un JOIN (eager loading ponctuel).
- La relation `@ManyToOne` est toujours du côté qui possède la FK (ici `Task`).

## Relation modélisée
```
User (1) ←——→ (N) Task
user.tasks[]       task.user
                   task.userId (FK)
```

## Ce qui est volontairement absent
- Pas d'authentification
- Pas de validation des DTOs
- Pas de `cascade` ni de `eager` loading automatique
