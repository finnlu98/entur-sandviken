import DocumentationBase from '../../../core/components/documentation-base';

import { NEWS_FETCH_INTERVAL } from '../../news-constants';

const NewsDocumentation = () => (
  <DocumentationBase
    imgPaths={['./img/integrations/nytimes_logo.png']}
    provider="The New York Times"
    dataUpdateInterval={NEWS_FETCH_INTERVAL}
    generalDocumentation="<p>Provides news feed from NRK. You will be able to choose to show news from different categories such as top news, sports, technology, and more soon.</p>"
  />
);

export default NewsDocumentation;
