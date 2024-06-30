import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { Redis } from 'ioredis';
import { ConfigName } from 'src/config/config-names.enum';
import { IRedisConfig } from 'src/config/redis.config';

@Injectable()
export class CachingService {
  private readonly tokenStorage: Redis;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly configService: ConfigService,
  ) {
    const cfg = configService.get<IRedisConfig>(ConfigName.REDIS);
    const { redisHost, redisPort, redisTokenDb } = cfg;
    this.tokenStorage = new Redis(redisPort, redisHost, { db: redisTokenDb });
  }

  async get<T>(key: string) {
    return await this.cache.get<T>(key);
  }

  async set(key: string, value: unknown, ttl?: number) {
    return await this.cache.set(key, value, ttl);
  }

  async setToken(key: string, value: string, ttl?: number) {
    await this.tokenStorage.set(key, value, 'EX', ttl);
  }

  async getToken(key: string) {
    return await this.tokenStorage.get(key);
  }

  async removeToken(key: string) {
    await this.tokenStorage.del(key);
  }
}
