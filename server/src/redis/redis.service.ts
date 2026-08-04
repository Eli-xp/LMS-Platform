import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async set(key: string, value: string, ttl: number) {
    await this.redis.set(key, value, 'EX', ttl);
  }
  async get(key: string) {
    return this.redis.get(key);
  }
  async del(key: string) {
    return this.redis.del(key);
  }
  async onModuleDestroy() {
    await this.redis.quit();
  }
}
