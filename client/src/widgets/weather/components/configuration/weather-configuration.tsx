import type { WeatherConfig } from '../../weather-widget';
import AdressSearch from '../../../../core/shared/adress-search/adress-search';
import type { Address } from '../../../../model/adress';

interface WeatherConfigurationProps {
  setConfig: (config: WeatherConfig) => void;
}

const WeatherConfiguration: React.FC<WeatherConfigurationProps> = ({ setConfig }) => {
  function handleAddressSelect(address: Address) {
    setConfig({
      lat: address.coordinate.lat.toString(),
      lon: address.coordinate.lon.toString(),
    });
  }

  return (
    <div className="h-column">
      <label htmlFor="lon">Weather location:</label>
      <div className="h-row">
        <AdressSearch onAddressSelect={handleAddressSelect} />
      </div>
    </div>
  );
};
export default WeatherConfiguration;
