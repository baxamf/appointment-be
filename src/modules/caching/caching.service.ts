import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string) {
    return await this.cache.get<T>(key);
  }

  async set(key: string, value: unknown, ttl?: number) {
    return await this.cache.set(key, value, ttl);
  }
}
