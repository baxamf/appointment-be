import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { jwtRefreshTokenCacheKey } from 'src/modules/caching/cache.keys';
import { CachingService } from 'src/modules/caching/caching.service';

@Injectable()
export class LogoutUserUseCase {
  constructor(private readonly cache: CachingService) {}

  async execute(user: User) {
    const cacheKey = jwtRefreshTokenCacheKey(user.id);

    await this.cache.removeToken(cacheKey);

    return { message: 'User logged out' };
  }
}
