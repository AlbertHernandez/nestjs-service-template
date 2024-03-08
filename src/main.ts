import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, HttpAdapterHost, } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

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
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);