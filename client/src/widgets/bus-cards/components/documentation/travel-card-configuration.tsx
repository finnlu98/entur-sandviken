import DocumentationBase from "../../../core/components/DocumentationBase";

import { TRAVEL_CARD_FETCH_INTERVAL } from "../../bus-cards-constants";

const TravelCardDocumentation = () => (
  <DocumentationBase
    imgPaths={["./img/integrations/entur_logo.svg"]}
    generalDocumentation="<p>The Travel Card widget provides real-time information about your selected travel routes, including departure times and delays. Stay informed and plan your journeys effectively with up-to-date transit data.</p>"
    dataUpdateInterval={TRAVEL_CARD_FETCH_INTERVAL}
  />
);  
export default TravelCardDocumentation;