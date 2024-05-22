import { Configuration } from './config.module';
import * as Joi from 'joi';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

const configSchemaValidation = Joi.object({
  TYPEORM_CONNECTION: Joi.string().valid('mysql').required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  REDIS_DSN: Joi.string().required(),
});

export const configuration = (
  overrideValues?: RecursivePartial<Configuration>,
) => {
  const result = configSchemaValidation.validate(process.env, {
    allowUnknown: true,
  });

  if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}`);
  }

  return {
    database: {
      type: overrideValues?.database?.type || result.value.TYPEORM_CONNECTION,
      host: overrideValues?.database?.host || result.value.TYPEORM_HOST,
      port: overrideValues?.database?.port || result.value.TYPEORM_PORT,
      username:
        overrideValues?.database?.username || result.value.TYPEORM_USERNAME,
      password:
        overrideValues?.database?.password || result.value.TYPEORM_PASSWORD,
      database:
        overrideValues?.database?.database || result.value.TYPEORM_DATABASE,
      synchronize:
        overrideValues?.database?.synchronize ||
        process.env.TYPEORM_SYNCHRONIZE,
    },
    redis: {
      dsn: overrideValues?.redis?.dsn || process.env.REDIS_DSN,
    },
  };
};

export const overrideConfiguration = (
  overrideValues: RecursivePartial<Configuration>,
) => {
  return () => configuration(overrideValues);
};
