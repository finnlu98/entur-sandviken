import type { Coordinates, Transform } from "@dnd-kit/utilities";
import type { GridItem, GridMetaData, PreviewState, Rect } from "../model/grid-models";
import { MoveType } from "../model/move-type";
import { ResizeDirection } from "../model/resize-direction";

export default class GridService {
  static compactLayout(widgets: GridItem[], gridData: GridMetaData): GridItem[] {
    const maxRows = Math.floor(gridData.height / gridData.colHeight);

    return widgets.map((widget) => {
      const maxAllowedRow = Math.max(0, maxRows - widget.rowSpan);
      const clampedRow = Math.min(widget.row, maxAllowedRow);

      return widget.row > maxAllowedRow ? { ...widget, row: clampedRow } : widget;
    });
  }

  static computeWidthAndHeight(
    gridItem: GridItem,
    moveTransform: Transform | null,
    gridData: GridMetaData,
    editMode: boolean,
  ): React.CSSProperties {
    const transform = moveTransform ?? { x: 0, y: 0 };

    const baseX = gridItem.col * gridData.colWidth;
    const baseY = gridItem.row * gridData.colHeight;

    const leftGap = gridItem.col !== 0 ? gridData.gap : 0;
    const finalX = baseX + transform.x + leftGap;
    let rightGap = gridItem.col !== gridData.columns - gridItem.colSpan ? gridData.gap * 2 : gridData.gap;
    rightGap = gridItem.col === 0 ? rightGap - gridData.gap : rightGap;

    const widthPx = gridItem.colSpan * gridData.colWidth - rightGap;
    const finalY = baseY + transform.y + gridData.gap;
    const heightPx = gridItem.rowSpan * gridData.colHeight - gridData.gap * 2;

    return {
      position: "absolute",
      width: widthPx,
      height: heightPx,
      cursor: editMode ? "grab" : "",
      transform: `translate(${finalX}px, ${finalY}px)`,
      touchAction: "none",
      userSelect: "none",
    };
  }

  static computeMove(moveBox: GridItem, gridData: GridMetaData, delta: Coordinates): GridItem {
    const dxCells = Math.round(delta.x / gridData.colWidth);
    const dyCells = Math.round(delta.y / gridData.colHeight);

    let targetCol = moveBox.col + dxCells;
    let targetRow = moveBox.row + dyCells;

    const maxCol = gridData.columns - moveBox.colSpan;
    targetCol = this.getMaxDimension(maxCol, moveBox.colSpan, targetCol);

    const maxRow = gridData.height / gridData.colHeight - moveBox.rowSpan;
    targetRow = this.getMaxDimension(maxRow, moveBox.rowSpan, targetRow);

    return { ...moveBox, col: targetCol, row: targetRow };
  }

  static getMaxDimension(maxDimension: number, boxSpan: number, boxTarget: number): number {
    return Math.max(0, Math.min(maxDimension, boxTarget));
  }

  static hasCollison(moveId: string, candidate: Rect, boxes: GridItem[], gridData: GridMetaData): boolean {
    boxes.some((item) => {
      if (item.id === moveId) return true;

      const other: Rect = {
        left: item.col * gridData.colWidth,
        top: item.row * gridData.colHeight,
        right: item.col * gridData.colWidth + item.colSpan * gridData.colWidth,
        bottom: item.row * gridData.colHeight + item.rowSpan * gridData.colHeight,
      };

      return this.rectanglesOverlap(candidate, other);
    });

    return false;
  }

  static rectanglesOverlap(a: Rect, b: Rect): boolean {
    return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
  }

  static computeResize(
    moveBox: GridItem,
    gridData: GridMetaData,
    delta: Coordinates,
    direction: ResizeDirection = ResizeDirection.BottomRight,
  ): GridItem {
    const deltaCols = Math.round(delta.x / gridData.colWidth);
    const deltaRows = Math.round(delta.y / gridData.colHeight);

    let newCol = moveBox.col;
    let newRow = moveBox.row;
    let newColSpan = moveBox.colSpan;
    let newRowSpan = moveBox.rowSpan;

    if (direction.includes(ResizeDirection.Right)) {
      newColSpan = Math.max(1, moveBox.colSpan + deltaCols);
    } else if (direction.includes(ResizeDirection.Left)) {
      const newSpan = Math.max(1, moveBox.colSpan - deltaCols);
      const spanDiff = moveBox.colSpan - newSpan;
      newCol = Math.max(0, moveBox.col + spanDiff);
      newColSpan = newSpan;
    }

    if (direction.includes(ResizeDirection.Bottom)) {
      newRowSpan = Math.max(1, moveBox.rowSpan + deltaRows);
    } else if (direction.includes(ResizeDirection.Top)) {
      const newSpan = Math.max(1, moveBox.rowSpan - deltaRows);
      const spanDiff = moveBox.rowSpan - newSpan;
      newRow = Math.max(0, moveBox.row + spanDiff);
      newRowSpan = newSpan;
    }

    const maxCol = gridData.columns - newColSpan;
    newCol = Math.max(0, Math.min(maxCol, newCol));

    const maxRow = gridData.height / gridData.colHeight - newRowSpan;
    newRow = Math.max(0, Math.min(maxRow, newRow));

    return { ...moveBox, col: newCol, row: newRow, colSpan: newColSpan, rowSpan: newRowSpan };
  }

  static computeShadow(
    id: string,
    moveBox: GridItem,
    gridData: GridMetaData,
    delta: Coordinates,
    moveType: MoveType,
    direction?: ResizeDirection,
  ): PreviewState | undefined {
    let shadowBox: GridItem | null = null;

    if (moveType === MoveType.move) shadowBox = this.computeMove(moveBox, gridData, delta);

    if (moveType === MoveType.resize)
      shadowBox = this.computeResize(moveBox, gridData, delta, direction || ResizeDirection.BottomRight);

    if (shadowBox) {
      return { id: id, col: shadowBox.col, row: shadowBox.row, colSpan: shadowBox.colSpan, rowSpan: shadowBox.rowSpan };
    }

    return undefined;
  }
}
