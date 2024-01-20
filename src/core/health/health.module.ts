import { LoggerModule } from "@core/logger/logger.module";
import { Module } from "@nestjs/common";

import { HealthController } from "./health.controller";

@Module({
  imports: [LoggerModule],
  controllers: [HealthController],
})
export class HealthModule {}
