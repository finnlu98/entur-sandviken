import { FaThermometerFull } from "react-icons/fa";
import LoadingHelperWidget from "../../../core/components/LoadingHelperWidget";
import { WidgetEnum } from "../../../core/model/widget-type";
import type { SwimmingResponse } from "../../model/swimming-response";
import "./swimming.css";
import type { SwimmingConfig } from "../../swimming-widget";
import { MdStarRate } from "react-icons/md";

interface SwimmingProps {
  data?: SwimmingResponse[];
  config?: SwimmingConfig;
}

const Swimming: React.FC<SwimmingProps> = ({ data, config }) => {
  const getTemperatureClass = (temp: number | null): string => {
    if (temp === null) return "";
    if (temp < 15) return "cold";
    if (temp >= 15 && temp < 22) return "warm";
    return "hot";
  };

  const getAverageTemperature = (): number | null => {
    if (!data || data.length === 0) return null;
    const totalTemp = data.reduce((sum, location) => sum + location.temperature, 0);
    return totalTemp / data.length;
  };

  const avgTemperature = data ? getAverageTemperature() : null;
  const highlightedLocations = data ? data.filter((location) => config?.keepIds?.includes(location.locationId)) : [];
  const otherLocations = data ? data.filter((location) => !config?.keepIds?.includes(location.locationId)) : [];
  const sortedLocations = [...highlightedLocations, ...otherLocations];

  return (
    <LoadingHelperWidget widgetKey={WidgetEnum.swimming} showConfig={() => !data} loadingKeys={["fetch-swimming"]}>
      <div className="fill-width h-column widget-overflow">
        <div className="widget-title h-column">
          <span>Swimming temperatures 🏊🏻‍♂️</span>
          {avgTemperature !== null && (
            <span className="h-row gap-small font-small swimming-row">
              <span>For {config?.searchLocation?.municipalityName}</span>
              <span className="swimming-temperature">~{avgTemperature.toFixed(1)}°</span>
              <span className={`${getTemperatureClass(avgTemperature)}`}>
                <FaThermometerFull />
              </span>
            </span>
          )}
        </div>
        {data && data.length > 0 ? (
          sortedLocations.map((location, index) => (
            <div key={location.locationId}>
              <div className="swimming-row h-row standard-rows">
                <div className="h-row">
                  <span>📍</span>

                  <div className="h-column">
                    <div
                      className={`h-row gap-small ${index < highlightedLocations.length ? "swimming-highlight" : ""}`}
                    >
                      <span>{location.locationName}</span>
                      {index < highlightedLocations.length && (
                        <span>
                          <MdStarRate />
                        </span>
                      )}
                    </div>
                    <div className="font-small">
                      <span>{Number((location.distanceFromLocation / 1000).toFixed(2))} km</span>
                    </div>
                  </div>
                </div>
                <div className="h-row">
                  <span className="swimming-temperature">{location.temperature}°</span>
                  <span className={`${getTemperatureClass(location.temperature)}`}>
                    <FaThermometerFull />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="swimming-empty">No swimming locations available</div>
        )}
      </div>
    </LoadingHelperWidget>
  );
};

export default Swimming;
