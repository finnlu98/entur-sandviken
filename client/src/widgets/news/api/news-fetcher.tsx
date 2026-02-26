import configuration from "../../../Configuration";
import type { NewsResponse } from "../model/NewsResponse";
import BaseWidgetApi from "../../core/api/BaseWidgetApi";

class NewsApi extends BaseWidgetApi {
  async getNewsData(): Promise<NewsResponse | undefined> {
    const newsEndpoint = configuration.getNewsConfig().NRK.Endpoint;
    return this.getXml<NewsResponse>(newsEndpoint, "fetch-news");
  }
}

const newsApi = new NewsApi();

export default newsApi;
