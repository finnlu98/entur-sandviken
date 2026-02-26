import { useWidgetQuery } from "../../core/hooks/useWidgetQuery";
import newsApi from "../api/news-fetcher";
import type { NewsResponse } from "../model/NewsResponse";

import { NEWS_FETCH_INTERVAL } from "../news-constants";

export function useNewsQuery() {
  return useWidgetQuery<NewsResponse | undefined>({
    queryKey: ["news"],
    queryFn: () => {
      return newsApi.getNewsData();
    },
    enabled: true,
    refetchInterval: NEWS_FETCH_INTERVAL,
    staleTime: 50 * 15 * 1000,
  });
}
