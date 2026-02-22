import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const user = await this.usersService.create(email, password);
    return { message: 'Inscription réussie', userId: user.id };
  }

  async login(email: string, password: string) {
    // 1. Est-ce que le user existe ?
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // 2. Est-ce que le mot de passe est correct ?
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    //3. Générer le token JWT.
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { acces_token: token };
  }
}
