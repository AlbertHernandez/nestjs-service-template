# Sentry en la Aplicación

Status: Not started

En el ejemplo proporcionado, se muestra cómo integrar Sentry en una aplicación Nest.js existente. A continuación, se detalla cómo se implementa Sentry en el código sin crear nuevos archivos:

1. **Inicialización de Sentry**: En el archivo **`main.ts`**, Sentry se inicializa proporcionando la clave DSN.

```tsx
typescriptCopy code
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

```

1. **Aplicación del Filtro de Sentry**: Se aplica un filtro de Sentry a nivel global en la aplicación. Esto se realiza también en el archivo **`main.ts`**.

```tsx
typescriptCopy code
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SentryFilter } from './logger/filters/sentry.filter'; // Importación del filtro de Sentry

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplicar el filtro de Sentry a nivel global
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  // Resto del código...
}

```

1. **Definición del Filtro de Sentry**: El filtro de Sentry se define en el archivo **`sentry.filter.ts`**, que se importa en el **`main.ts`**.

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

Con estas implementaciones, Sentry está integrado en la aplicación Nest.js. Los errores no manejados son capturados por el filtro de Sentry y enviados a Sentry para su registro y seguimiento. La inicialización de Sentry y la aplicación del filtro se realizan en el archivo **`main.ts`** sin necesidad de crear nuevos archivos.