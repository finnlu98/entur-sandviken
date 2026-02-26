import moment, { type Moment } from 'moment';

export class Caches {
  caches: Map<string, Cache>;
  TTL_MS: number;

  constructor(TTL_MS: number = 0) {
    this.caches = new Map();
    this.TTL_MS = TTL_MS;
  }

  flushOldCaches(): void {
    if (this.TTL_MS <= 0) return;
    const now = moment();
    for (const [key, cache] of this.caches.entries()) {
      if (now.diff(cache.ts) >= this.TTL_MS) {
        this.caches.delete(key);
      }
    }
  }

  getCache(key: string): Cache | undefined {
    return this.caches.get(key);
  }

  addCache(key: string, data: any): void {
    this.flushOldCaches();

    if (this.caches.size > 1000) {
      const oldestKey = this.caches.keys().next().value;
      if (oldestKey) this.caches.delete(oldestKey);
    }

    const cache = new Cache(key, moment(), data);
    this.caches.set(key, cache);
  }

  returnCache(key: string): Cache | null {
    const cache = this.getCache(key);
    const cachedTime = cache?.ts;
    const cachedData = cache?.data;

    if (cachedData && cachedTime && moment().diff(cachedTime) < this.TTL_MS) {
      return cache;
    } else if (cache) {
      this.caches.delete(key);
    }

    return null;
  }
}

export class Cache {
  key: string;
  ts: Moment;
  data?: any;

  constructor(key: string, ts: Moment, data?: any) {
    this.key = key;
    this.ts = ts;
    this.data = data;
  }
}
