import { Logger } from "@nestjs/common";

import { HealthController } from "@core/health/api/health.controller";

import { createMock, Mock } from "@tests/utils/mock";

describe("HealthController", () => {
  let healthController: HealthController;
  let logger: Mock<Logger>;

  beforeEach(() => {
    logger = createMock<Logger>();
    healthController = new HealthController(logger);
  });

  describe("run", () => {
    it("should return is healthy", () => {
      expect(healthController.run()).toEqual({ status: "ok" });
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
