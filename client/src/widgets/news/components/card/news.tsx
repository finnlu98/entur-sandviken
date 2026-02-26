import type { NewsResponse } from "../../model/NewsResponse";
import "./news.css";
import LoadingHelperWidget from "../../../core/components/LoadingHelperWidget";
import { WidgetEnum } from "../../../core/model/widget-type";

interface NewsProps {
  data?: NewsResponse;
}

const News: React.FC<NewsProps> = ({ data }) => {
  return (
    <LoadingHelperWidget widgetKey={WidgetEnum.news} loadingKeys={["fetch-news"]}>
      <div className="h-column fill-width widget-overflow">
        <div className="widget-title">
          <div>Current news 📰</div>
        </div>
        <div className="h-column">
          {data &&
            data.rss.channel.item.map((newsItem) => {
              return (
                <div key={newsItem.title} className="standard-rows h-row gap">
                  <div className="news-text font-small">{newsItem.title}</div>
                  <div className="news-img-container right-align">
                    <img
                      className="news-img"
                      src={newsItem?.media_content?.url ? `${newsItem.media_content.url}` : "./img/news/newspaper.png"}
                      alt="news-image"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </LoadingHelperWidget>
  );
};

export default News;
