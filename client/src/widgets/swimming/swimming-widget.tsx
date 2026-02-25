import { FaSwimmingPool } from "react-icons/fa";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { SwimmingResponse } from "./model/swimming-response";
import Swimming from "./components/card/swimming";
import { useSwimmingQuery } from "./hook/swimming-hook";
import SwimmingConfiguration from "./components/configuration/swimming-configuration";
import { Address } from "../../model/Adress";
import SwimmingDocumentation from "./components/documentation/swimming-documentation";
import { SWIMMING_FETCH_INTERVAL } from "./swimming-constants";

export const SwimmingWidget: WidgetDefinition<SwimmingConfig, SwimmingResponse[]> = {
  id: WidgetEnum.swimming,
  friendlyName: "Swimming",
  widgetIcon: <FaSwimmingPool />,
  widgetComponent: Swimming,
  useQuery: useSwimmingQuery,
  widgetConfig: {
    component: SwimmingConfiguration,
    documentation: SwimmingDocumentation,
  },
  defaultColSpan: 6,
  defaultRowSpan: 6,
  fetchtingInterval: SWIMMING_FETCH_INTERVAL,
};

export interface SwimmingConfig {
  searchLocation?: Address;
  keepIds?: string[];
  displayMap?: boolean;
}
