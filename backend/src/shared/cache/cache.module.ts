import { Module } from '@nestjs/common';
import { CACHE_REPOSITORY } from './domain/cache.repository.interface';
import { RedisCacheRepository } from './infrastructure/redis-cache.repository';

@Module({
  providers: [
    {
      provide: CACHE_REPOSITORY,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [CACHE_REPOSITORY],
})
export class SharedCacheModule {}
