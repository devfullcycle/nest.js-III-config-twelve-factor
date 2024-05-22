import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../config/config.module';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    NestCacheModule.registerAsync<RedisClientOptions>({
      useFactory: (configService: ConfigService<Configuration>) => ({
        store: redisStore as any,
        url: configService.get('redis.dsn', { infer: true }),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
