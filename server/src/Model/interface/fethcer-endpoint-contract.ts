import type IFetcher from './fetcher-contract';

export default interface IFethcerEndpoint extends IFetcher {
  endpoint?: string;
  header?: object;
  body?: object;
  params?: object;
  setEndpoint(endpoint: string): void;
  setHeader(header: object): void;
  setBody(body: object): void;
}
