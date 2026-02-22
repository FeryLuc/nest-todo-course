# CLAUDE.md — concept/AUTH-JWT

## Concept illustré
**Authentification JWT complète** — Passport, `JwtStrategy`, `JwtAuthGuard`, routes protégées.

## Objectif pédagogique
Comprendre le mécanisme complet d'authentification JWT dans NestJS : génération du token au login, validation à chaque requête via Passport, et protection des routes avec un Guard.

## Fichiers présents

```
src/
├── main.ts
├── app.module.ts                        # TypeOrmModule + AuthModule + UsersModule + TasksModule
├── auth/
│   ├── auth.module.ts                   # JwtModule.registerAsync + PassportModule
│   ├── auth.controller.ts               # POST /auth/register + POST /auth/login
│   ├── auth.service.ts                  # register() + login() → retourne access_token
│   ├── jwt.strategy.ts                  # PassportStrategy — valide le token, retourne req.user
│   ├── guards/
│   │   └── jwt-auth.guard.ts            # extends AuthGuard('jwt')
│   ├── decorators/
│   │   └── get-user.decorator.ts        # @GetUser() — extrait req.user
│   └── dto/
│       ├── register.dto.ts
│       └── login.dto.ts
├── users/
│   ├── user.entity.ts
│   ├── users.module.ts                  # exports: [UsersService]
│   └── users.service.ts                 # findById() utilisé par JwtStrategy
└── tasks/
    ├── task.entity.ts
    ├── tasks.module.ts
    ├── tasks.controller.ts              # @UseGuards(JwtAuthGuard) sur tout le controller
    └── tasks.service.ts
```

## Flux d'authentification

```
1. POST /auth/register → hash bcrypt → save User
2. POST /auth/login → bcrypt.compare → jwtService.sign({ sub: id, email }) → { access_token }
3. GET /tasks (Header: Authorization: Bearer <token>)
   → JwtAuthGuard → JwtStrategy.validate() → findById() → req.user = User
   → Controller reçoit @GetUser() user
```

## Points clés à comprendre

- `PassportStrategy(Strategy)` : mixin — retourne une classe à étendre selon la stratégie choisie.
- `ExtractJwt.fromAuthHeaderAsBearerToken()` : extrait le token du header `Authorization: Bearer`.
- `validate(payload)` : appelée par Passport après vérification de la signature. Son retour est attaché à `req.user`.
- `JwtAuthGuard extends AuthGuard('jwt')` : lie le guard à la stratégie nommée `'jwt'`.
- `@UseGuards(JwtAuthGuard)` sur le controller : protège **toutes** les routes du controller.
- `JwtModule.registerAsync` : config dynamique pour lire `JWT_SECRET` depuis `ConfigService`.
- `UsersModule` doit `exports: [UsersService]` pour que `AuthModule` puisse l'utiliser.

## Ce qui est volontairement absent
- Pas de refresh token
- Pas de filtre/interceptor global
