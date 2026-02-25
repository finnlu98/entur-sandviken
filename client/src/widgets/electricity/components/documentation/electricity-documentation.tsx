import DocumentationBase from "../../../core/components/DocumentationBase";
import { ELECTRICITY_FETCH_INTERVAL } from "../../electricity-constants";

const ElectricityDocumentation = () => (
  <DocumentationBase
    imgPaths={["/img/integrations/elvia.svg"]}
    dataUpdateInterval={ELECTRICITY_FETCH_INTERVAL}
    generalDocumentation="<p>This card shows real time electricity consumption. Helping users monitor and optimize their energy consumption.</p>"
    extraRequirements='<p>To use this widget, you need to have an account with Elvia and generate an API key. Visit their <a href="https://www.elvia.no/smart-forbruk/api-er-for-smartere-hjem-og-bedrifter/slik-kan-du-ta-i-bruk-metervalue-api/" target="_blank" rel="noopener noreferrer">website</a> to create an account and obtain your API key.</p>'
  />
);

export default ElectricityDocumentation;