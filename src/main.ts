import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    // No need to specify an adapter for Express as it's the default
  );

  // Validation pipes still work the same with Express
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");

  await app.listen(port, "0.0.0.0"); // Use app.listen for Express



  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} `);
}

bootstrap().catch(handleError);

// ... error handling and logging as before

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

console.log(process.env);

process.on("uncaughtException", handleError);