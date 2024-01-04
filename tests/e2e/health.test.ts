import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../src/app.module";

describe("HealthController (e2e)", () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/health (GET)", () => {
    return request(app.getHttpServer())
      .get("/health")
      .expect(200)
      .expect({ status: "ok" });
  });
});
