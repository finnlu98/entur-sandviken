import "./city-bike.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import type { CityBikeConfig } from "../../CityBikeWidget";
import LoadingHelperWidget from "../../../core/components/LoadingHelperWidget";
import { WidgetEnum } from "../../../core/model/widget-type";
import type { CityBikeData } from "../../model/CityBikeData";

const homeIcon = L.divIcon({
  className: "home-label-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

interface CityBikeProps {
  data?: CityBikeData;
  config?: CityBikeConfig;
}

const CityBike: React.FC<CityBikeProps> = ({ data, config }) => {
  function formatMarker(available: number) {
    let formattedClass = "bike-label";

    if (available === 0) formattedClass += " empty";

    return L.divIcon({
      className: "bike-label-icon",
      html: `<div class="${formattedClass}">${available}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  }

  return (
    <LoadingHelperWidget
      widgetKey={WidgetEnum.cityBike}
      loadingKeys={["fetch-city-bike-status", "fetch-city-bike-stations"]}
      showConfig={() => !config && !data}
    >
      {config && (
        <div className="city-bikes-container">
          <div className="widget-title">
            <div>Available city bikes</div>
            <img className="header-icon" src="/img/city-bike/bicycle-parking.png" alt="bicycle"></img>
          </div>
          <div className="map">
            <MapContainer
              key={`${config.centerCoordinates.lat}-${config.centerCoordinates.lon}-${config.zoom}`}
              className="map-component"
              center={[Number(config.centerCoordinates.lat), Number(config.centerCoordinates.lon)]}
              zoom={config.zoom}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
              <Marker
                position={[Number(config.homeCoordinates.lat), Number(config.homeCoordinates.lon)]}
                icon={homeIcon}
              />
              {data?.stations &&
                data.stations.map((station) => (
                  <Marker
                    key={station.station_id}
                    position={[Number(station.lat), Number(station.lon)]}
                    icon={formatMarker(station.num_bikes_available)}
                  ></Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      )}
    </LoadingHelperWidget>
  );
};

export default CityBike;
