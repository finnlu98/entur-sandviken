import BaseResponse from '../../../api/model/base-response';

export class NewsResponse extends BaseResponse {
  static Identifier = 'NewsResponse';
  rss!: Channel;
}

class Channel {
  channel!: ChannelContent;
}

class ChannelContent {
  item!: NewsItem[];
}

class NewsItem {
  title!: string;
  media_content!: MediaContent;
}

// This can be missing from request
class MediaContent {
  url?: string;
}
