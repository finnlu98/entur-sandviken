import type { WeatherConfig } from "../../WeatherWidget";
import AdressSearch from "../../../../core/shared/adressSearch/AdressSearch";
import type { Address } from "../../../../model/Adress";

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
