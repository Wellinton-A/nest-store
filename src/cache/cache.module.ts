import { Module } from '@nestjs/common'
import { CacheModule as CacheManager } from '@nestjs/cache-manager'

import { CacheService } from './cache.service'

@Module({
  imports: [
    CacheManager.register({
      ttl: 90000000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
