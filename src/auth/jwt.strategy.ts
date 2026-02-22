import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
//PassportStrategy() est un mixin. une fonction qui retourne une classe enrichie. Strategy = passeport-jwt strategy. On choisis dynamiquement la classe a étendre pour ne pas contraindre génériquement car si on veut utiliser d'autre strategy on peut.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET')!, //meme clé que dans auth.module
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; //sera attaché à req.user
  }
}
