import { registerAs } from '@nestjs/config';
import { ConfigName } from './config-names.enum';

export interface IRedisConfig {
  redisHost: string;
  redisPort: number;
  redisCacheDb: number;
  redisTokenDb: number;
}

export const redisConfig = registerAs(ConfigName.REDIS, () => {
  const config: IRedisConfig = {
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: +process.env.REDS_PORT || 6379,
    redisCacheDb: +process.env.REDIS_CACHE_DB,
    redisTokenDb: +process.env.REDIS_TOKEN_DB,
  };

  if (Object.values(config).includes(undefined)) {
    throw new Error('[RedisConfig]: Invalid configuration');
  }

  return config;
});
