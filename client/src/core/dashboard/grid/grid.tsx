import React, { useEffect, useRef } from 'react';
import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import type { PreviewState } from './model/grid-models';
import WidgetContainer from './widget/widget-container';
import GridService from './service/grid-service';
import { MoveType } from './model/move-type';
import { ResizeDirection } from './model/resize-direction';
import { useDashboard } from '../../../context/dashboard-context';
import DefaultDashboardActions from '../default/DefaultDashboardActions';
import './grid.css';
import { isDefaultView } from '../util/isDefaultView';

const COLUMNS = 24;
const GAP = 5;
const ROW_ASPECT = 1;

export const Grid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = React.useState<PreviewState | null>(null);
  const { widgets, updateWidget } = useDashboard();
  const { editMode, gridMetaData, onGridResize } = useDashboard();
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;

      const columns = COLUMNS;
      const colWidth = width / columns;

      const idealColHeight = colWidth / ROW_ASPECT;
      const maxRows = Math.floor(height / idealColHeight);
      const colHeight = height / maxRows;

      const gap = GAP;

      onGridResize({ width, height, colWidth, colHeight, columns, gap });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [onGridResize]);

  const handleDragMove = (event: DragMoveEvent) => {
    if (event.activatorEvent instanceof TouchEvent) {
      event.activatorEvent.preventDefault();
    }

    const { active, delta } = event;
    const id = active.id as string;

    const isResize = id.includes(MoveType.resize);
    const baseId = isResize ? getBaseId(id) : id;

    const current = widgets.find((b) => b.id === baseId);
    if (!current || !gridMetaData) {
      setPreview(null);
      return;
    }

    const moveType = isResize ? MoveType.resize : MoveType.move;
    const direction = getDirectionFromId(id);

    const shadowBox = GridService.computeShadow(
      id,
      current,
      gridMetaData,
      delta,
      moveType,
      direction
    );
    if (shadowBox) setPreview(shadowBox);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.activatorEvent instanceof TouchEvent) {
      event.activatorEvent.preventDefault();
    }

    const { active, delta } = event;
    const id = active.id;

    const isResize = id.toString().includes(MoveType.resize);
    const baseId = isResize ? getBaseId(id) : id;

    const box = widgets.find((b) => b.id === baseId);

    if (box && gridMetaData) {
      if (id.toString().includes(MoveType.resize)) {
        const direction = getDirectionFromId(id.toString());
        const updateItemResize = GridService.computeResize(box, gridMetaData, delta, direction);
        setPreview(null);
        updateWidget(updateItemResize);
      } else {
        const updateItemMove = GridService.computeMove(box, gridMetaData, delta);
        setPreview(null);
        updateWidget(updateItemMove);
      }
    }
  };

  function getDirectionFromId(id: string): ResizeDirection {
    if (id.includes(ResizeDirection.TopLeft)) return ResizeDirection.TopLeft;
    if (id.includes(ResizeDirection.TopRight)) return ResizeDirection.TopRight;
    if (id.includes(ResizeDirection.BottomLeft)) return ResizeDirection.BottomLeft;
    if (id.includes(ResizeDirection.BottomRight)) return ResizeDirection.BottomRight;
    if (id.includes(ResizeDirection.Top)) return ResizeDirection.Top;
    if (id.includes(ResizeDirection.Bottom)) return ResizeDirection.Bottom;
    if (id.includes(ResizeDirection.Left)) return ResizeDirection.Left;
    if (id.includes(ResizeDirection.Right)) return ResizeDirection.Right;
    return ResizeDirection.BottomRight;
  }

  function getBaseId(id: UniqueIdentifier): string {
    return id.toString().replace(/-resize.*$/, '');
  }

  const gridStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundSize: gridMetaData
      ? `${gridMetaData.colWidth}px ${gridMetaData.colHeight}px`
      : undefined,
    border: editMode.editMode || isDefaultView(widgets) ? '1px solid #ddd' : undefined,
    backgroundImage:
      editMode.editMode || isDefaultView(widgets)
        ? 'linear-gradient(to right, #eee 1px, transparent 1px),' +
          'linear-gradient(to bottom, #eee 1px, transparent 1px)'
        : undefined,
    backgroundColor: editMode.editMode ? '#d3d3d33f' : undefined,
    transition: 'background-color 0.3s ease, border 0.3s ease',
  };

  return (
    <div ref={containerRef} style={gridStyle}>
      {isDefaultView(widgets) && (
        <div className="default-dashboard-actions">
          <DefaultDashboardActions />
        </div>
      )}
      <DndContext onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
        {gridMetaData &&
          widgets.map((item) => (
            <WidgetContainer key={item.id} gridItem={item} gridData={gridMetaData} />
          ))}

        {preview && gridMetaData && (
          <div
            style={{
              position: 'absolute',
              left: preview.col * gridMetaData?.colWidth,
              top: preview.row * gridMetaData?.colHeight,
              width: preview.colSpan * gridMetaData?.colWidth,
              height: preview.rowSpan * gridMetaData?.colHeight,
              borderRadius: 8,
              border: '2px dashed rgba(0,0,0,0.4)',
              background: 'rgba(0,0,0,0.05)',
              pointerEvents: 'none',
              zIndex: 999,
            }}
          />
        )}
      </DndContext>
    </div>
  );
};
