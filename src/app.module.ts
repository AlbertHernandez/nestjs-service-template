import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// hello

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
  ],
})
export class AppModule {}
