import DocumentationBase from '../../../core/components/documentation-base';

import { CITY_BIKE_FETCH_INTERVAL } from '../../city-bike-constants';

const CityBikeDocumentation = () => (
  <DocumentationBase
    provider="Oslo City Bike"
    generalDocumentation="<p>The City Bike widget displays real-time information about available city bikes at various stations in your selected area. Stay updated on bike availability and plan your rides accordingly.</p>"
    dataUpdateInterval={CITY_BIKE_FETCH_INTERVAL}
  />
);

export default CityBikeDocumentation;
