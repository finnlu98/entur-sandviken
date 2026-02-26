import type IFethcerEndpoint from '../../model/interface/fethcer-endpoint-contract';
import BaseFetcher from './base-fetcher';
import axios from 'axios';

export default class BaseFetcherEndpoint extends BaseFetcher implements IFethcerEndpoint {
  endpoint?: string;
  header?: object;
  body?: object;
  params?: object;

  async fetchData(): Promise<any> {
    if (this.endpoint && this.header)
      return await axios.get(this.endpoint, { headers: this.header });

    if (this.endpoint) return await axios.get(this.endpoint);
  }

  async PostData(): Promise<any> {
    if (this.endpoint && this.header && this.body && this.params)
      return await axios.post(this.endpoint, this.body, {
        headers: this.header,
        params: this.params,
      });
    if (this.endpoint && this.header && this.body)
      return await axios.post(this.endpoint, this.body, { headers: this.header });
    if (this.endpoint && this.header)
      return await axios.post(this.endpoint, {}, { headers: this.header });
    if (this.endpoint) return await axios.post(this.endpoint);
  }

  setEndpoint(endpoint: string) {
    endpoint = endpoint.trim();
    this.endpoint = endpoint;
  }

  setHeader(header: object) {
    this.header = header;
  }

  setBody(body: object) {
    if (typeof body === 'object' && body !== null && !Array.isArray(body)) {
      this.body = body;
    } else {
      this.body = { value: body };
    }
  }

  setParams(params: object) {
    this.params = params;
  }
}
