## **Introducción**

El Módulo de Configuración en tu aplicación Nest.js v10 sirve como un punto central para administrar variables de entorno y configurar varios aspectos de tu aplicación. Esta documentación proporciona una guía completa sobre cómo utilizar y extender el Módulo de Configuración dentro de tu proyecto.

### **Propósito**

El Módulo de Configuración tiene como objetivo:

- Proporcionar un fácil acceso a variables de entorno en toda la aplicación.
- Ofrecer un enfoque estandarizado para administrar configuraciones para diferentes entornos.
- Facilitar la integración sin problemas con servicios y bibliotecas externas al centralizar la configuración.

### **Uso**

El Módulo de Configuración está configurado globalmente dentro de la aplicación, lo que permite que todos los módulos accedan fácilmente a los parámetros de configuración. Para utilizar el Módulo de Configuración, sigue estos pasos:

1. **Inyectar el Módulo de Configuración**: Inyecta el Módulo de Configuración en otros módulos agregándolo al constructor de la clase donde se necesiten los parámetros de configuración.

```tsx
typescriptCopy code
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './env-configuration'; // Ruta a tu archivo de configuración de entorno

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
  ],
  controllers: [/* Tus controladores */],
  providers: [/* Tus proveedores */],
})
export class AppModule {}

```

1. **Acceder a los Parámetros de Configuración**: Una vez inyectado, los parámetros de configuración pueden ser accedidos utilizando el **`ConfigService`** proporcionado por Nest.js.

```tsx
typescriptCopy code
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('port');
  }

  getLoggerLevel(): string {
    return this.configService.get<string>('loggerLevel');
  }

  // Agrega más métodos para recuperar otros parámetros de configuración según sea necesario
}

```

## **Configuración del Entorno**

La Configuración del Entorno te permite definir variables específicas del entorno y sus valores predeterminados. Estas variables se obtienen típicamente de archivos de entorno (.env) o variables de entorno.

### **Parámetros de Configuración**

- **environment**: Especifica el entorno actual de la aplicación (**`development`** por defecto).
- **loggerLevel**: Define el nivel de registro para la aplicación (**`development`** por defecto).
- **port**: Define el puerto en el que el servidor escuchará (el valor predeterminado es **`3000`**).
- **dbPassword**: Contraseña para la conexión a la base de datos.
- **dbName**: Nombre de la base de datos.
- **dbHost**: Nombre del host del servidor de la base de datos.
- **dbPort**: Número de puerto del servidor de la base de datos.
- **dbUser**: Nombre de usuario para la conexión a la base de datos.
- **jwtSecret**: Clave secreta utilizada para la generación de tokens JWT.
- **googleClientId**: ID de cliente para Google OAuth.
- **googleClientSecret**: Secreto de cliente para Google OAuth.
- **googleCallbackUrl**: URL de retorno para Google OAuth.
- **mailerSecret**: Clave secreta para el servicio de correo.
- **mailerEmail**: Dirección de correo electrónico para el servicio de correo.
- **mailerService**: Proveedor de servicios para el servicio de correo (por ejemplo, Gmail, SendGrid).
- **sentryDsn**: DSN para el servicio de seguimiento de errores de Sentry.
- **sentryEnabled**: Bandera para habilitar/deshabilitar el seguimiento de errores de Sentry.

### **Valores Predeterminados**

Si una variable de entorno no está configurada explícitamente, el Módulo de Configuración utilizará el valor predeterminado especificado en la configuración.

## **Conclusión**

El Módulo de Configuración en tu aplicación Nest.js proporciona una forma conveniente y organizada de administrar variables de entorno y configuraciones de la aplicación. Siguiendo las pautas descritas en esta documentación, puedes integrar y utilizar eficientemente las configuraciones en todo tu proyecto.
