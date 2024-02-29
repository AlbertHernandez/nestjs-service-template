import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";

import { UserModule } from "@contexts/users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestProductModule } from './test-product/test-product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      autoLoadEntities: true,
      // Nota: User esto solo en development.
      // En producción usar migraciones.
      synchronize: true,

    }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    UserModule,
    TestProductModule,
  ],
})

export class AppModule {

}
