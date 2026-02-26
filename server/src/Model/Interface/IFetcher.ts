import type { Caches } from "../../Cache/Cache";

export default interface IFetcher {
  caches: Caches | undefined;
  fetchData(): Promise<any>;
  getData(key: string): Promise<any>;
}
