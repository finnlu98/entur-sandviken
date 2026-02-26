import { WidgetEnum } from '../../../widgets/core/model/widget-type';
import type { GridItem } from '../grid/model/grid-models';

export function isDefaultView(widgets: GridItem[]) {
  return widgets.length <= 1 && widgets.some((w) => w.widget === WidgetEnum.Header);
}
