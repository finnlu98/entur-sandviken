import type { WidgetEnum } from "../../../../widgets/core/model/widget-type";

export type GridItem = {
  id: string;
  col: number;
  colSpan: number;
  row: number;
  rowSpan: number;
  widget: WidgetEnum;
};

export type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export interface GridMetaData {
  width: number;
  height: number;
  colWidth: number;
  colHeight: number;
  columns: number;
  gap: number;
}

export interface PreviewState {
  id: string;
  col: number;
  colSpan: number;
  row: number;
  rowSpan: number;
}
