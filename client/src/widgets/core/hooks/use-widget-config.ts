import { useDashboard } from "../../../context/dashboard-context";
import type { WidgetEnum } from "../model/widget-type";

export function useWidgetConfig<TConfig>(widget: WidgetEnum): TConfig | undefined {
  const { widgetConfigs } = useDashboard();
  return widgetConfigs[widget] as TConfig | undefined;
}
