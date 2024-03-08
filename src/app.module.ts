import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from '@core/health/health.module';
import { LoggerModule } from '@core/logger/logger.module';

import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { FilesModule } from './files/files.module';
import { EnvConfiguration } from './config/env.config';
import { TranslateModule } from './translate/translate.module';

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
    AbilityModule,
    FilesModule,
    AuthModule,
    TranslateModule,
  ],
})

export class AppModule { }
