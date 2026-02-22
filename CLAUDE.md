# CLAUDE.md — concept/BCRYPT

## Concept illustré
**bcrypt** — hachage sécurisé des mots de passe et vérification.

## Objectif pédagogique
Comprendre pourquoi on ne stocke jamais un mot de passe en clair, comment bcrypt hache avec un salt aléatoire, comment vérifier un mot de passe sans le déhacher, et le rôle du paramètre `saltRounds`.

## Fichiers présents

```
src/
├── main.ts
├── app.module.ts
└── users/
    ├── users.module.ts
    ├── users.controller.ts  # POST /users/register + POST /users/login
    └── users.service.ts     # bcrypt.hash() + bcrypt.compare()
```

## Points clés à comprendre

- `bcrypt.hash(password, saltRounds)` : hache le mot de passe avec un salt **aléatoire** intégré dans le hash. Deux appels avec le même mot de passe produisent des hashs différents.
- `bcrypt.compare(plaintext, hash)` : extrait le salt du hash et re-hache pour comparer. **Ne jamais comparer les strings directement.**
- `saltRounds` (ici `10`) : coût de calcul. Plus le nombre est élevé, plus c'est lent (et résistant au brute force). `10` est la valeur standard.
- Le hash bcrypt contient tout : l'algorithme, le coût, le salt et le hash → un seul champ en BDD.
- Message d'erreur identique pour email inconnu et mauvais mot de passe → pas d'énumération d'utilisateurs.

## Format d'un hash bcrypt
```
$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
 ↑   ↑  ↑                    ↑
algo cost salt(22 chars)     hash(31 chars)
```

## Routes
- `POST /users/register` → `{ email, password }` → hash + stockage
- `POST /users/login` → `{ email, password }` → vérification bcrypt

## Ce qui est volontairement absent
- Pas de JWT après le login (voir branche `concept/AUTH-JWT`)
- Pas de base de données — utilisateurs en mémoire
- Pas de validation des DTOs
