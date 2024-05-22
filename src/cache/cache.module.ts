import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config/config.module';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    NestCacheModule.registerAsync<RedisClientOptions>({
      useFactory: (configService: ConfigService<Config>) => ({
        store: redisStore as any,
        url: configService.get('REDIS_DSN'),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
