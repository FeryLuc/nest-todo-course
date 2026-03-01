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
    // Est-ce que le user existe ?
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Est-ce que le mot de passe est correct ?
    const isPasswordValid = await bcrypt.compare(password, user.password); // compare extraitle salt et le cost(round), rehashe le mot de passe fournit avec le salt et cost puis compare avec celui en db.
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    //Générer le token JWT.
    const payload = { sub: user.id, email: user.email }; //les données qu'on embarque dans le token. sub c'est une propriété par convention qui représenter l'identifiant.
    const token = this.jwtService.sign(payload); //crée le token avec ce payload. token = header(algo + type), payload(les données embarquées), signature (avec le secret).

    return { acces_token: token };
  }
}
