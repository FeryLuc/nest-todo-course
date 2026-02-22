# nest-todo-course

API REST de gestion de tâches construite avec NestJS dans un contexte d'apprentissage.

## Stack

- **NestJS 11** — framework Node.js
- **TypeORM 0.3** + **PostgreSQL** — persistance
- **Passport JWT** — authentification
- **class-validator** — validation des DTOs
- **Swagger / OpenAPI** — documentation API

## Prérequis

- Node.js 18+
- PostgreSQL

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=nest_todo
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

## Lancer le projet

```bash
# développement (hot-reload)
npm run start:dev

# production
npm run build
npm run start:prod
```

## Documentation API

Swagger UI disponible sur `http://localhost:3000/api` (hors production).

## Tests

```bash
npm run test          # tests unitaires
npm run test:e2e      # tests end-to-end
npm run test:cov      # couverture de code
```

## Endpoints

### Auth
| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/register` | Créer un compte |
| POST | `/auth/login` | Se connecter → retourne un JWT |

### Tasks *(JWT requis)*
| Méthode | Route | Description |
|---|---|---|
| GET | `/tasks` | Récupérer toutes mes tâches |
| GET | `/tasks/:id` | Récupérer une tâche |
| POST | `/tasks` | Créer une tâche |
| PATCH | `/tasks/:id` | Modifier une tâche |
| DELETE | `/tasks/:id` | Supprimer une tâche |

## Branches pédagogiques

Ce repo contient 14 branches `concept/` — chacune isole un concept NestJS avec le strict minimum fonctionnel pour l'étudier indépendamment.

| Branche | Concept |
|---|---|
| `concept/MODULE-CONTROLLER-SERVICE` | Trio de base NestJS |
| `concept/CONFIG-MODULE` | Variables d'env avec ConfigModule/ConfigService |
| `concept/TYPEORM-ENTITY` | Connexion BDD + entité simple |
| `concept/REPOSITORY-PATTERN` | @InjectRepository + méthodes Repository\<T\> |
| `concept/DTO-VALIDATION-PIPE` | DTOs + class-validator + ValidationPipe |
| `concept/RELATIONS-ORM` | @OneToMany / @ManyToOne |
| `concept/ASYNC-AWAIT` | Patterns async/await dans les services |
| `concept/EXCEPTIONS-HTTP` | NotFoundException, ForbiddenException, etc. |
| `concept/EXCEPTION-FILTER` | @Catch() global + réponse uniforme |
| `concept/INTERCEPTORS` | NestInterceptor avec RxJS tap et map |
| `concept/BCRYPT` | Hash + compare, salt rounds |
| `concept/AUTH-JWT` | Passport + JwtStrategy + JwtAuthGuard |
| `concept/CUSTOM-DECORATOR` | createParamDecorator + ExecutionContext |
| `concept/SWAGGER` | Documentation API avec @nestjs/swagger |

Chaque branche possède son propre `CLAUDE.md` et son propre `README.md`.
