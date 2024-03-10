import { Controller, Get, HttpCode, Inject, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";

@Controller("health")
export class HealthController {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  @HttpCode(200)
  async run() {
    this.logger.log("Health endpoint called!");
    try {
      await this.dataSource.query("SELECT 1");
      this.logger.log("Database connection is healthy");
      return { status: "OK" };
    } catch (error) {
      this.logger.error("Error connecting to the database", error);
      return { status: "Service Unavailable" };
    }
  }
}
