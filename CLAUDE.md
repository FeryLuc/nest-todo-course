# CLAUDE.md — nest-todo-course

## Présentation du projet

API REST de gestion de tâches (Todo) construite avec NestJS 11, TypeORM et PostgreSQL.
Contexte pédagogique : cours d'apprentissage NestJS.

**Stack :**
- Runtime : Node.js + TypeScript
- Framework : NestJS 11
- ORM : TypeORM 0.3 + PostgreSQL (`pg`)
- Auth : Passport JWT (`passport-jwt`, `@nestjs/jwt`)
- Validation : `class-validator` + `class-transformer`
- Docs : Swagger (`@nestjs/swagger`)
- Tests : Jest + Supertest

---

## Structure du projet

```
src/
├── main.ts                          # Bootstrap, pipes/filters/interceptors globaux, Swagger
├── app.module.ts                    # Module racine : ConfigModule, TypeOrmModule, imports des modules
├── app.controller.ts / app.service.ts
│
├── tasks/
│   ├── tasks.module.ts
│   ├── tasks.controller.ts          # CRUD protégé par JwtAuthGuard
│   ├── tasks.service.ts             # Logique métier + ownership check
│   ├── task.entity.ts               # @Entity, @ManyToOne(User)
│   └── dto/
│       ├── create-task.dto.ts       # @IsString, @IsNotEmpty, @MaxLength(100)
│       └── update-task.dto.ts
│
├── users/
│   ├── users.module.ts
│   ├── users.service.ts             # create (bcrypt hash), findByEmail, findById
│   └── user.entity.ts               # @Entity, @OneToMany(Task)
│
├── auth/
│   ├── auth.module.ts               # JwtModule.registerAsync, PassportModule
│   ├── auth.controller.ts           # POST /auth/register, POST /auth/login
│   ├── auth.service.ts              # register + login (bcrypt.compare + jwtService.sign)
│   ├── jwt.strategy.ts              # PassportStrategy(Strategy), validate() → req.user
│   ├── guards/
│   │   └── jwt-auth.guard.ts        # extends AuthGuard('jwt')
│   ├── decorators/
│   │   └── get-user.decorator.ts    # createParamDecorator → extrait req.user
│   └── dto/
│       ├── register.dto.ts          # @IsEmail, @MinLength(6)
│       └── login.dto.ts
│
└── common/
    ├── filters/
    │   └── http-exception.filter.ts  # @Catch() — uniformise toutes les erreurs en JSON
    └── interceptors/
        ├── logging.interceptor.ts    # log méthode/url + durée (RxJS tap)
        └── transform.interceptor.ts  # enveloppe les réponses : { data, timestamp }
```

---

## Concepts NestJS présents

| Concept | Fichier(s) |
|---|---|
| `@Module` + architecture modulaire | `*.module.ts` |
| `@Controller` + décorateurs HTTP | `tasks.controller.ts`, `auth.controller.ts` |
| `@Injectable` / Services | `*.service.ts` |
| Injection de dépendances (constructeur) | tous les services |
| `@InjectRepository` + TypeORM Repository | `tasks.service.ts`, `users.service.ts` |
| `ValidationPipe` global | `main.ts` |
| `ParseIntPipe` | `tasks.controller.ts` |
| DTOs + `class-validator` | `dto/*.dto.ts` |
| Guards (`@UseGuards`, `AuthGuard`) | `jwt-auth.guard.ts`, `tasks.controller.ts` |
| `ExceptionFilter` (`@Catch`) | `http-exception.filter.ts` |
| `NestInterceptor` (RxJS) | `logging.interceptor.ts`, `transform.interceptor.ts` |
| Custom Param Decorator | `get-user.decorator.ts` |
| `PassportStrategy` (mixin) | `jwt.strategy.ts` |
| `ConfigModule` / `ConfigService` | `app.module.ts`, `auth.module.ts` |
| `forRootAsync` / `registerAsync` | `app.module.ts`, `auth.module.ts` |
| Entités TypeORM + relations | `task.entity.ts`, `user.entity.ts` |
| `@OneToMany` / `@ManyToOne` | entités |
| Swagger (`@ApiTags`, `@ApiBearerAuth`) | `tasks.controller.ts`, `main.ts` |
| `Logger` natif NestJS | `logging.interceptor.ts`, `http-exception.filter.ts` |
| Exceptions HTTP (`NotFoundException`, `ForbiddenException`, etc.) | services |

---

## Comportements importants

### Auth flow
1. `POST /auth/register` → hash bcrypt du mot de passe → sauvegarde en BDD
2. `POST /auth/login` → `bcrypt.compare` → `jwtService.sign({ sub: id, email })` → retourne `acces_token`
3. Toutes les routes `/tasks` sont protégées par `@UseGuards(JwtAuthGuard)` au niveau du controller
4. `JwtStrategy.validate()` retrouve le user en BDD et l'attache à `req.user`
5. `@GetUser()` extrait `req.user` dans les paramètres de méthode

### Ownership des tâches
- Chaque tâche a un `userId` (colonne FK)
- `TasksService.findOne()` vérifie `task.userId !== userId` → `ForbiddenException`
- Toutes les méthodes du service reçoivent `userId` et filtrent par lui

### Réponses API
Toutes les réponses sont enveloppées par `TransformInterceptor` :
```json
{ "data": <résultat>, "timestamp": "ISO8601" }
```
Les erreurs sont uniformisées par `AllExceptionsFilter` :
```json
{ "statusCode": 4xx/500, "timestamp": "ISO8601", "path": "/...", "message": "..." }
```

---

## Variables d'environnement (`.env`)

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
JWT_EXPIRES_IN=
PORT=3000
NODE_ENV=development
```

---

## Commandes

```bash
npm run start:dev    # dev avec hot-reload
npm run build        # compile vers dist/
npm run start:prod   # lance dist/main.js
npm run test         # tests unitaires Jest
npm run test:e2e     # tests end-to-end
npm run test:cov     # couverture de code
```

Swagger UI disponible sur `http://localhost:3000/api` (hors production).

---

## Conventions du projet

- Les services ne retournent pas directement `async` si la valeur n'est pas manipulée localement (NestJS résout les Promises en bout de chaîne)
- `TypeOrmModule.forRootAsync` avec `useFactory` pour la config dynamique (dépend de `ConfigService`)
- `synchronize: true` activé — **dev uniquement**, ne pas activer en production
- `whitelist: true` + `forbidNonWhitelisted: true` sur `ValidationPipe` — tout champ non déclaré dans le DTO est rejeté
- Les commentaires dans le code sont en français (projet pédagogique francophone)
