import { FaRegNewspaper } from 'react-icons/fa';
import News from './components/card/news';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';
import { useNewsQuery } from './hooks/news-hook';
import type { NewsResponse } from './model/NewsResponse';
import NewsDocumentation from './components/documentation/news-documentation';
import { NEWS_FETCH_INTERVAL } from './news-constants';

export const NewsWidget: WidgetDefinition<object, NewsResponse> = {
  id: WidgetEnum.news,
  friendlyName: 'News',
  widgetIcon: <FaRegNewspaper />,
  widgetComponent: News,
  useQuery: useNewsQuery,
  widgetConfig: {
    documentation: NewsDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
  fetchtingInterval: NEWS_FETCH_INTERVAL,
};
