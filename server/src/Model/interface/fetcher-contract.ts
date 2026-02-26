import type { Caches } from '../../cache/cache';

export default interface IFetcher {
  caches: Caches | undefined;
  fetchData(): Promise<any>;
  getData(key: string): Promise<any>;
}
