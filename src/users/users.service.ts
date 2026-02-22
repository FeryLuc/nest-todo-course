import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  email: string;
  password: string; // hash stocké, jamais le mot de passe en clair
}

// SALT_ROUNDS : coût du hachage. Plus le nombre est élevé, plus c'est lent (et sûr).
// 10 est la valeur standard recommandée pour un bon équilibre sécurité/performance.
const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  async register(email: string, password: string) {
    const existing = this.users.find((u) => u.email === email);
    if (existing) throw new ConflictException('Email déjà utilisé');

    // bcrypt.hash() : hache le mot de passe avec un salt aléatoire.
    // Le salt est intégré dans le hash résultant — pas besoin de le stocker séparément.
    // Chaque appel produit un hash différent même pour le même mot de passe.
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user: User = { id: this.nextId++, email, password: hashedPassword };
    this.users.push(user);

    return { message: 'Inscription réussie', userId: user.id };
  }

  async login(email: string, password: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      // Message identique email/password inconnu → pas d'énumération d'utilisateurs
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // bcrypt.compare() : compare le mot de passe en clair avec le hash stocké.
    // Il extrait le salt du hash et re-hache le mot de passe pour comparer.
    // Ne jamais comparer les strings directement !
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Email ou mot de passe incorrect');

    return {
      message: 'Connexion réussie',
      userId: user.id,
      // En prod → générer un JWT ici (voir branche concept/AUTH-JWT)
    };
  }
}
