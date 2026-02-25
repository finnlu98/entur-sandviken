import { Caches } from "../../Cache/Cache";
import IFetcher from "../../Model/Interface/IFetcher";

export default abstract class BaseFetcher implements IFetcher {
  caches: Caches;
  TTL_MS: number;

  constructor(cacheLength: number) {
    this.TTL_MS = cacheLength;
    this.caches = new Caches(this.TTL_MS);
  }

  abstract fetchData(): Promise<any>;

  async getData(key: string = ""): Promise<any> {
    const cache = this.caches.returnCache(key);
    if (cache) {
      console.log(`Returning cached request for key: ${key}`);
      return cache.data;
    }

    console.log(`Sending request to get data for key: ${key}`);

    var res = await this.fetchData();
    if (res && "data" in res) {
      this.caches.addCache(key, res.data);
      return res.data;
    }

    this.caches.addCache(key, res);
    return res;
  }
}
