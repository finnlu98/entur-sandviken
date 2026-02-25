import { WidgetEnum } from "../model/widget-type";
import { Widgets } from "../model/widgets";
import { useWidgetConfig } from "./useWidgetConfig";

export function useWidgetQueryResult<TConfig>(widget: WidgetEnum) {
  const config = useWidgetConfig<TConfig>(widget);

  return useWidgetQuery(widget, config as TConfig);
}

export function useWidgetQuery<TConfig>(widget: WidgetEnum, config?: TConfig) {
  const defaultQueryResult = {
    data: undefined,
    isLoading: false,
    error: undefined,
  };
  return Widgets[widget].useQuery?.(config) ?? (() => defaultQueryResult)();
}
