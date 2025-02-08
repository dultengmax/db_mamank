import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCachekey(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value);
  }
  async getCachekey(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async delCachekey(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
  async resetCache(): Promise<void> {
    await this.cacheManager.clear();
  }
}
