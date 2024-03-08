# **Filtro de Sentry para Registro de Errores**

El filtro de Sentry proporciona una capa de manejo de errores global en una aplicación NestJS. Este filtro utiliza la biblioteca **`@sentry/node`** para enviar los errores a Sentry en entornos de producción, mientras que en entornos de desarrollo utiliza el registro predeterminado de NestJS.

## **Configuración**

El filtro de Sentry se inicializa y configura condicionalmente dependiendo del entorno de ejecución (**`NODE_ENV`**). En entornos de producción, se inicializa Sentry y se aplica el filtro de Sentry globalmente para capturar y enviar errores a Sentry. En entornos de desarrollo, el filtro de Sentry no se aplica y se utiliza el registro predeterminado de NestJS.

```tsx
typescriptCopy code
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import * as Sentry from '@sentry/node';
import { SentryFilter } from './logger/filters/sentry.filter';
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const isProduction = configService.get<string>("NODE_ENV") === 'production';

  if (isProduction) {
    // Inicialización de Sentry en producción
    Sentry.init({
      dsn: process.env.SENTRY_DNS,
    });
    // Aplicar el filtro de Sentry globalmente
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new SentryFilter(httpAdapter));
  }

  // Necesario usando Fastify.
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<string>("PORT", "3000");

  await app.listen(port, "0.0.0.0");

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on("uncaughtException", handleError);

```

## **Uso**

El filtro de Sentry captura y envía automáticamente los errores a Sentry en entornos de producción. No se requiere ninguna acción adicional por parte del desarrollador. En entornos de desarrollo, el registro predeterminado de NestJS se utiliza para mostrar los errores en la consola.

```tsx
typescriptCopy code
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        Sentry.captureException(exception);
        super.catch(exception, host);
    }
}

```

Con este filtro de Sentry, tu aplicación NestJS puede manejar errores de manera efectiva tanto en entornos de producción como de desarrollo, proporcionando una experiencia de desarrollo sin problemas y una detección temprana de errores en producción.
