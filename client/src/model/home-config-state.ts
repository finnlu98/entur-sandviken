import type { GridItem } from "../core/dashboard/grid/model/grid-models";
import type { WidgetEnum } from "../widgets/core/model/widget-type";

export type HomeConfig = {
  widgetPositions: GridItem[] | null;
  widgetConfig: Record<WidgetEnum, object> | null;
};

export const HomeConfigUtils = {
  equals(config1: HomeConfig | null, config2: HomeConfig | null): boolean {
    if (!config1 || !config2) return config1 === config2;

    const positions1 = JSON.stringify(config1.widgetPositions);
    const positions2 = JSON.stringify(config2.widgetPositions);
    const configs1 = JSON.stringify(config1.widgetConfig);
    const configs2 = JSON.stringify(config2.widgetConfig);

    return positions1 === positions2 && configs1 === configs2;
  },
};
