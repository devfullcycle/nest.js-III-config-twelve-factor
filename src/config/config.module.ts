import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { join } from 'path';
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

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const { envFilePath, ...otherOptions } = options;

    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath! : [envFilePath!]),
        join(__dirname, `../../.env.${process.env.NODE_ENV}`),
        join(__dirname, '../../.env'),
      ],
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
      ...otherOptions,
    });
  }
}
