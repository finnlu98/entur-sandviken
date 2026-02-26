import configuration from '../../../configuration';
import type { NewsResponse } from '../model/news-response';
import BaseWidgetApi from '../../core/api/base-widget-api';

class NewsApi extends BaseWidgetApi {
  async getNewsData(): Promise<NewsResponse | undefined> {
    const newsEndpoint = configuration.getNewsConfig().NRK.Endpoint;
    return this.getXml<NewsResponse>(newsEndpoint, 'fetch-news');
  }
}

const newsApi = new NewsApi();

export default newsApi;
