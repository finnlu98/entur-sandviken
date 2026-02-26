import { MdInfoOutline } from "react-icons/md";
import AdressSearch from "../../../../core/shared/adressSearch/AdressSearch";
import PopupButton from "../../../../core/shared/popup/Popup";
import type { Address } from "../../../../model/Adress";
import type { SwimmingResponse } from "../../model/swimming-response";
import type { SwimmingConfig } from "../../swimming-widget";
import "./swimming-configuration.css";
import { useLoading } from "../../../../feedback/loading/hooks/useLoading";
import LoadingOverlay from "../../../../feedback/loading/components/Loading/LoadingOverlay";

interface SwimmingConfigurationProps {
  setConfig: (config: SwimmingConfig) => void;
  config?: SwimmingConfig;
  data?: SwimmingResponse[] | undefined;
}

const SwimmingConfiguration: React.FC<SwimmingConfigurationProps> = ({ setConfig, config, data }) => {
  const { isLoading: checkLoading } = useLoading();
  const loadingKeys = ["fetch-swimming"];
  const loading = loadingKeys ? loadingKeys.some((key) => checkLoading(key)) : false;

  function handleAddressSelect(address: Address) {
    setConfig({ ...config, searchLocation: address });
  }

  function handleKeepLocation(locationId: string) {
    const keepIds = config?.keepIds || [];
    if (keepIds.includes(locationId)) {
      setConfig({
        ...config,
        keepIds: keepIds.filter((id) => id !== locationId),
      });
    } else {
      setConfig({
        ...config,
        keepIds: [...keepIds, locationId],
      });
    }
  }

  return (
    <div className="h-column gap-large">
      <div className="h-column">
        <label htmlFor="lon">Your location:</label>
        <AdressSearch onAddressSelect={handleAddressSelect} />
      </div>
      {loading && <LoadingOverlay />}

      <div className="h-column">
        {data && (
          <>
            <div className="h-row">
              <label>Select swimming locations you want to highlight:</label>
              <PopupButton surface="surface" position="right" buttonHiearchy="button-text-only">
                {() => [
                  <span>
                    <MdInfoOutline />
                  </span>,
                  <div>
                    This list will change through out the year based on people sending in temperatures. You can always
                    come back to select areas you want to highlight. Picking an area will make it show up in the top of
                    your card.
                  </div>,
                ]}
              </PopupButton>
            </div>
            <div className="swimming-results h-column gap-small">
              {data.length > 0 &&
                data.map((location) => (
                  <button
                    key={location.locationId}
                    className={`h-row fill-width secondary ${config?.keepIds?.includes(location.locationId) ? "selected" : ""}`}
                    onClick={() => handleKeepLocation(location.locationId)}
                  >
                    <span>📍 {location.locationName}</span>
                    <span>{Number((location.distanceFromLocation / 1000).toFixed(2))} km</span>
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SwimmingConfiguration;
