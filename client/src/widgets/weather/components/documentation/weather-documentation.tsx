import DocumentationBase from '../../../core/components/documentation-base';

import { WEATHER_FETCH_INTERVAL } from '../../weather-constants';

const WeatherDocumentation = () => {
  return (
    <DocumentationBase
      imgPaths={['./img/integrations/met_logo.jpg', './img/integrations/yr_logo.svg']}
      provider="met.no"
      dataUpdateInterval={WEATHER_FETCH_INTERVAL}
      generalDocumentation="<p>The Weather widget provides up-to-date weather information for your specified adress.</p>"
    />
  );
};

export default WeatherDocumentation;
