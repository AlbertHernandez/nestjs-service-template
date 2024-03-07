# Documentación del Módulo de Autenticación

Status: Done

## **Introducción**

Esta documentación presenta el módulo de autenticación integrado en tu aplicación Nest.js 10. El módulo permite la autenticación de usuarios mediante Tokens de Seguridad JSON (JWT) y proporciona soporte para la confirmación de correos electrónicos de nuevos usuarios antes de guardarlos en la base de datos. También incluye una estrategia de autenticación Google OAuth2.0 para facilitar el inicio de sesión.

## **Características**

1. **Estrategia de Autenticación JWT**: Utiliza Passport para autenticar usuarios mediante JWT.
2. **Confirmación de Correo Electrónico para Nuevos Usuarios**: Los nuevos usuarios deben confirmar su correo electrónico antes de registrarse en la base de datos.
3. **Estrategia de Autenticación Google OAuth2.0**: Permite a los usuarios iniciar sesión utilizando sus cuentas de Google.

## **Uso**

### **Ejemplo de Implementación del Módulo de Autenticación**

```tsx
// auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'tu_clave_secreta', // Reemplaza con tu clave secreta
      signOptions: { expiresIn: '1d' }, // Establece el tiempo de expiración para el JWT
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

```

```tsx
typescriptCopy code
// auth.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Implementa tus métodos de autenticación y registro aquí
}

```

```tsx
// jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'tu_clave_secreta', // Reemplaza con tu clave secreta
    });
  }

  async validate(payload: any) {
    // Implementa la validación del token JWT aquí
    // Retorna el usuario si el token es válido
  }
}

```

```tsx
typescriptCopy code
// google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifiedCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: 'tu_client_id', // Reemplaza con tu ID de cliente Google OAuth
      clientSecret: 'tu_client_secret', // Reemplaza con tu secreto de cliente Google OAuth
      callbackURL: 'tu_url_de_retorno', // Reemplaza con tu URL de retorno
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ): Promise<any> {
    // Implementa tu lógica de validación aquí
    const user = await this.authService.validateOAuthLogin(profile);
    done(null, user);
  }
}

```

```tsx
// auth.controller.ts

import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Implementa tus rutas de autenticación y registro aquí
}

```

### **Notas**

- Reemplaza las claves secretas, IDs de cliente y URLs de retorno con tus propias credenciales.
- Implementa la lógica de autenticación y registro en **`auth.service.ts`**.
- Define las rutas de autenticación y registro en **`auth.controller.ts`**.

## **Conclusiones**

El módulo de autenticación proporciona una manera segura y eficiente de manejar la autenticación de usuarios en tu aplicación Nest.js 10. Al seguir las estructuras proporcionadas y configurar adecuadamente las estrategias de autenticación, los desarrolladores pueden implementar fácilmente la autenticación JWT, la confirmación de correo electrónico y la autenticación de Google OAuth2.0 en su aplicación. Para obtener más detalles sobre la implementación específica, consulta la documentación oficial de Nest.js y Passport.