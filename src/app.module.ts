import * as path from 'path';
import * as Sentry from '@sentry/node';

import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { redisStore } from 'cache-manager-redis-yet';


import { UserModule } from "@contexts/users/user.module";
import { TestProductModule } from './test-product/test-product.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { FilesModule } from './files/files.module';
import { EnvConfiguration } from './config/env.config';


@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [EnvConfiguration]
    }),
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
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          }
        });
        return store;
      },
    }),
    LoggerModule,
    HealthModule,
    TestProductModule,
    SeedModule,
    AbilityModule,
    FilesModule,
    AuthModule,
    UserModule,
  ],
})

export class AppModule {

}
