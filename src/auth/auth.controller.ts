import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ForbiddenError } from '@casl/ability';
import { AuthService } from './auth.service';
import { } from './dto/create-user.dto';
import { LoginUserDto, CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilityFactory } from '@src/ability/ability.factory';

import { Action } from '@src/ability/ability.factory';


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

  // Email Login.
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {

    return this.authService.login(loginUserDto);
  }

  // Google Login.
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any): Promise<void> { }

  // Google Login Redirect.
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute() {
    return {
      message: 'This is a private route',
      status: 200
    };
  }

  @Get('public')
  testingPublicRoutes() {
    return {
      message: 'This is a public route',
      status: 200
    };
  }

  @Get('ability')
  @UseGuards(AuthGuard())
  testAuthorization(@Req() request: any) {
    return false;
  }


}
