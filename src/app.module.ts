import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

export type Config = {
  TYPEORM_CONNECTION: string;
  TYPEORM_HOST: string;
  TYPEORM_PORT: number;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_DATABASE: string;
  TYPEORM_SYNCHRONIZE: boolean;
  REDIS_DSN: string;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TYPEORM_CONNECTION: Joi.string().valid('mysql').required(),
        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_PORT: Joi.number().required(),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
        REDIS_DSN: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => ({
        type: configService.get('TYPEORM_CONNECTION') as any,
        host: configService.get('TYPEORM_HOST'),
        port: configService.get('TYPEORM_PORT') as number,
        username: configService.get('TYPEORM_USERNAME') as string,
        password: configService.get('TYPEORM_PASSWORD') as string,
        database: configService.get('TYPEORM_DATABASE') as string,
        entities: [],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') as boolean,
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: (configService: ConfigService<Config>) => ({
        store: redisStore as any,
        url: configService.get('REDIS_DSN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
