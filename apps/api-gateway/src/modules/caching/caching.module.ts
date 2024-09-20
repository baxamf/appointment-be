import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigName } from '@config/config-names.enum';
import { IRedisConfig } from '@config/redis.config';
import { CachingService } from './caching.service';

const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const cfg = configService.get<IRedisConfig>(ConfigName.REDIS);

    const store = await redisStore({
      database: cfg.redisCacheDb,
      socket: {
        host: cfg.redisHost,
        port: cfg.redisPort,
      },
    });

    return {
      store,
    };
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  providers: [CachingService],
  exports: [CachingService],
})
export class CachingModule {}
