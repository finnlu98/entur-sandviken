import type { CityBikeConfig } from "../../CityBikeWidget";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents, ZoomControl } from "react-leaflet";
import L from "leaflet";
import AdressSearch from "../../../../core/shared/adressSearch/AdressSearch";
import type { Address } from "../../../../model/Adress";
import "./cityBikeConfiguration.css";
import { useCityBikeStationQuery, useClosestCityBikeStations } from "../../hook/city-bike-hook";

interface CityBikeConfigurationProps {
  config?: CityBikeConfig;
  setConfig: React.Dispatch<React.SetStateAction<CityBikeConfig>>;
}

const defaultConfig: CityBikeConfig = {
  homeCoordinates: { lat: 0, lon: 0 },
  centerCoordinates: { lat: 59.92159991761743, lon: 10.737959825316603 },
  zoom: 12,
  stations: [],
};

const CityBikeConfiguration: React.FC<CityBikeConfigurationProps> = ({ config = defaultConfig, setConfig }) => {
  const { data: cityStationsResponse } = useCityBikeStationQuery();

  const closestStations = useClosestCityBikeStations(cityStationsResponse, config.homeCoordinates);

  const handleChange = (newConfig: Partial<CityBikeConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  const homeIcon = L.divIcon({
    className: "home-label-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const MapEventHandler = () => {
    const map = useMap();
    useEffect(() => {
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom();
      const configLat = Number(config.centerCoordinates.lat);
      const configLon = Number(config.centerCoordinates.lon);
      const configZoom = config.zoom ?? 13;

      const latDiff = Math.abs(currentCenter.lat - configLat);
      const lonDiff = Math.abs(currentCenter.lng - configLon);
      const zoomDiff = Math.abs(currentZoom - configZoom);

      if (latDiff > 0.0001 || lonDiff > 0.0001 || zoomDiff > 0.1) {
        map.setView([configLat, configLon], configZoom);
      }
    }, [map]);

    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        handleChange({
          centerCoordinates: {
            lat: center.lat.toString(),
            lon: center.lng.toString(),
          },
          zoom: e.target.getZoom(),
        });
      },
    });
    return null;
  };

  const handleStationClick = (stationId: string) => {
    const isSelected = config?.stations?.includes(stationId);

    handleChange({
      stations: isSelected
        ? config?.stations?.filter((id) => id !== stationId)
        : [...(config?.stations ?? []), stationId],
    });
  };

  function formatMarker(stationId: string) {
    let selected = "☑️";

    if (config?.stations?.length > 0 && config?.stations.includes(stationId)) selected = "✅";

    return L.divIcon({
      className: "bike-label-icon",
      html: `<div class="bike-label">${selected}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  }

  function onAddressSelect(address: Address) {
    setConfig((prev) => ({ ...prev, homeCoordinates: address.coordinate, centerCoordinates: address.coordinate }));
  }

  return (
    <div className="city-bike-configuration h-column">
      <div className="h-column">
        <label htmlFor="homeId">Home address:</label>
        <AdressSearch onAddressSelect={onAddressSelect} />
        <label htmlFor="homeId">Selected stations (click on map to select):</label>
      </div>
      <div className="map">
        <MapContainer
          key={`map-config`}
          className="map-component"
          center={[Number(config.centerCoordinates.lat), Number(config.centerCoordinates.lon)]}
          zoom={config?.zoom ?? 13}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
          <ZoomControl position="bottomright" />
          <MapEventHandler />
          <Marker position={[Number(config.homeCoordinates.lat), Number(config.homeCoordinates.lon)]} icon={homeIcon} />

          {closestStations &&
            closestStations.map((station) => (
              <Marker
                key={station.station_id}
                position={[station.lat, station.lon]}
                icon={formatMarker(station.station_id)}
                eventHandlers={{
                  click: () => handleStationClick(station.station_id),
                }}
              />
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CityBikeConfiguration;
