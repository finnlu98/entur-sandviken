import type { GridItem } from '../core/dashboard/grid/model/grid-models';
import type { WidgetEnum } from '../widgets/core/model/widget-type';
import { WidgetConfigs } from '../widgets/core/model/widgets';

const LAYOUT_VERSION = import.meta.env.VITE_LAYOUT_VERSION || '1.0.0';
const CONFIG_VERSION = import.meta.env.VITE_CONFIG_VERSION || '1.0.0';

type VersionedData<T> = {
  version: string;
  data: T;
};

export const ConfigMigration = {
  migrateLayout(raw: any): GridItem[] {
    if (Array.isArray(raw)) {
      return raw;
    }

    const versioned = raw as VersionedData<GridItem[]>;

    switch (versioned.version) {
      case '1.0.0':
        return versioned.data;
      default:
        console.warn(`Unknown layout version ${versioned.version}`);
        return [];
    }
  },

  migrateConfig(raw: any): Record<WidgetEnum, object> {
    if (raw && !raw.version && typeof raw === 'object') {
      return raw;
    }

    const versioned = raw as VersionedData<Record<WidgetEnum, object>>;

    switch (versioned.version) {
      case '1.0.0':
        return versioned.data;
      default:
        console.warn(`Unknown config version ${versioned.version}`);
        return WidgetConfigs;
    }
  },

  wrapLayout(data: GridItem[]): VersionedData<GridItem[]> {
    return {
      version: LAYOUT_VERSION,
      data,
    };
  },

  wrapConfig(data: Record<WidgetEnum, object>): VersionedData<Record<WidgetEnum, object>> {
    return {
      version: CONFIG_VERSION,
      data,
    };
  },
};
