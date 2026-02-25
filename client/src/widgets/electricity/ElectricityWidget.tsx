import { ImPower } from "react-icons/im";
import ElectricyConsumption from "./components/electricity-consumption/electricity-consumption";
import ElectricityConfiguration from "./components/configuration/electricity-configuration";
import { WidgetDefinition, WidgetEnum } from "../core/model/widget-type";
import { ELECTRICITY_FETCH_INTERVAL } from "./electricity-constants";
import { useElviaConsumptionQuery } from "./hook/electricity-hook";
import { ElectricityData } from "./model/ElectricityData";
import ElectricityDocumentation from "./components/documentation/electricity-documentation";

export const ElectricityWidget: WidgetDefinition<ElectricityConfig, ElectricityData> = {
  id: WidgetEnum.electricity,
  friendlyName: "Electricity",
  widgetIcon: <ImPower />,
  useQuery: useElviaConsumptionQuery,
  widgetComponent: ElectricyConsumption,
  widgetConfig: {
    component: ElectricityConfiguration,
    documentation: ElectricityDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 6,
  fetchtingInterval: ELECTRICITY_FETCH_INTERVAL,
};

export interface ElectricityConfig {}
