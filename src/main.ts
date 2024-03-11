/**
 * La función `bootstrap` inicializa una aplicación NestJS, configura Sentry en entornos de producción,
 * aplica un filtro global de Sentry para capturar errores, y maneja errores no capturados.
 */
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import * as Sentry from '@sentry/node';
import { SentryFilter } from './logger/filters/sentry.filter';
import { AppModule } from "./app.module";

// Esta función inicializa la aplicación NestJS.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const isProduction = configService.get<string>("NODE_ENV") === 'production';

  if (isProduction) {
    Sentry.init({
      dsn: process.env.SENTRY_DNS,
    });
    // Aplica el filtro de Sentry globalmente para capturar errores.
    app.useGlobalFilters(new SentryFilter()); // No es necesario pasar httpAdapter
  }

  // El ValidationPipe se utiliza para validar los datos de las solicitudes entrantes.
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<string>("PORT", "3000");

  await app.listen(port, "0.0.0.0");


  const logger = app.get(Logger);
  logger.log(`La aplicación está lista y escuchando en el puerto ${port} `);
}

// Maneja cualquier error no capturado que ocurra durante la ejecución de la aplicación.
bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);