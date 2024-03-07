import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilityFactory } from '@src/ability/ability.factory';
``;
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private abilityFactory: AbilityFactory,
  ) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.authService.create(createUserDto);
  }
  // Confirm Email.
  @Get('confirm-email/:token')
  async confirmEmail(@Param('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  // Email Login.
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {

    return this.authService.login(loginUserDto);
  }

  // Google Login.
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any): Promise<void> { }

  // Google Login Redirect.
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute() {
    return {
      message: 'Esta es una ruta privada',
      status: 200
    };
  }

  @Get('public')
  testingPublicRoutes() {
    return {
      message: 'Esta es una ruta pública',
      status: 200
    };
  }

  @Get('ability')
  @UseGuards(AuthGuard())
  testAuthorization(@Req() request: any) {
    return false;
  }


}
