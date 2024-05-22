import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from '../config/config.module';

@Module({
  imports: [
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
  ],
})
export class DatabaseModule {}
