import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { AbilityModule } from '@src/ability/ability.module';

import { EmailService } from '@src/email/email.service';
import { GoogleStrategy } from './strategies/google/google.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, EmailService],
  imports: [
    AbilityModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    // No confundir con`JwtModule.register` sincrono  que
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Definido asincrono para extender su funcionalidad en el futuro.
      useFactory: async (configService: ConfigService) => {
        // Dev-Nota: Tratar de acceder a las variables de entorno con el método get de la instancia de ConfigService.
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  // Esto hace el servicio auth.service.ts disponible para otros módulos.
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
