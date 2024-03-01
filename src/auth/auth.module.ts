import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
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
