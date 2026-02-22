# CLAUDE.md — concept/ASYNC-AWAIT

## Concept illustré
**Patterns async/await** dans NestJS — quand l'utiliser, quand l'omettre, et comment NestJS résout les Promises.

## Objectif pédagogique
Comprendre la différence entre retourner une `Promise` directement et utiliser `async/await`. Saisir que NestJS résout automatiquement les Promises retournées par les controllers, et identifier précisément quand `async` devient nécessaire.

## Fichiers présents

```
src/
├── main.ts
├── app.module.ts             # TypeOrmModule + ConfigModule
└── tasks/
    ├── task.entity.ts
    ├── tasks.module.ts
    ├── tasks.controller.ts
    └── tasks.service.ts      # Les 5 méthodes illustrent les patterns async
```

## Les deux patterns expliqués dans tasks.service.ts

### Pattern 1 — Retourner la Promise directement (PAS de async)
```typescript
// Inutile d'awaiter si on ne manipule pas le résultat localement.
// NestJS résout la Promise retournée en bout de chaîne.
findAll(): Promise<Task[]> {
  return this.taskRepository.find();
}
```

### Pattern 2 — async/await NÉCESSAIRE
```typescript
// On doit awaiter pour tester la valeur et prendre une décision.
async findOne(id: number): Promise<Task> {
  const task = await this.taskRepository.findOne({ where: { id } });
  if (!task) throw new NotFoundException(...); // impossible sans await
  return task;
}
```

## Règle simple
> `async` est nécessaire quand on a besoin de la **valeur** du résultat pour faire quelque chose (condition, transformation, réutilisation). Si on se contente de retourner la Promise, `async` est superflu.

## Ce qui est volontairement absent
- Pas de validation des DTOs
- Pas d'authentification
