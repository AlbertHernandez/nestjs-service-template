import { Logger } from "@nestjs/common";
import { DataSource } from "typeorm";

import { HealthController } from "@core/health/api/health.controller";

import { createMock, Mock } from "@tests/utils/mock";

describe("HealthController", () => {
  let healthController: HealthController;
  let logger: Mock<Logger>;

  beforeEach(() => {
    logger = createMock<Logger>();
    healthController = new HealthController(logger, createMock<DataSource>());
  });

  describe("Check health", () => {
    it("should return is healthy", async () => {
      const result = await healthController.run();
      expect(result).toEqual({ status: "OK" });
      expect(logger.log).toHaveBeenCalledTimes(2);
    });
  });
});
