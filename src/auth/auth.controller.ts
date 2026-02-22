import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Créer un compte' })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @ApiOperation({ summary: 'Se connecter' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
