import { useDraggable } from "@dnd-kit/core";
import type { GridItem } from "./model/grid-models";
import { ResizeDirection, ResizeDirectionType } from "./model/resize-direction";
import "./resize-handles.css";

type ResizeHandleProps = {
  id: string;
  direction: ResizeDirection;
  edgeType: string;
  children?: React.ReactNode;
};

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ id, direction, edgeType, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: `${id}-resize-${direction}` });
  return (
    <div
      className={`resize-handle ${edgeType} ${direction.toLowerCase()}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

interface ResizeHandlesProps {
  gridItem: GridItem;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ gridItem }) => {
  const { id } = gridItem;

  const handleConfigs: Array<{
    direction: ResizeDirection;
    edgeType: ResizeDirectionType;
    children?: React.ReactNode;
  }> = [
    { direction: ResizeDirection.BottomRight, edgeType: ResizeDirectionType.Corner },
    { direction: ResizeDirection.BottomLeft, edgeType: ResizeDirectionType.Corner },
    { direction: ResizeDirection.TopRight, edgeType: ResizeDirectionType.Corner },
    { direction: ResizeDirection.TopLeft, edgeType: ResizeDirectionType.Corner },
    { direction: ResizeDirection.Right, edgeType: ResizeDirectionType.Edge },
    { direction: ResizeDirection.Left, edgeType: ResizeDirectionType.Edge },
    { direction: ResizeDirection.Bottom, edgeType: ResizeDirectionType.Edge },
    { direction: ResizeDirection.Top, edgeType: ResizeDirectionType.Edge },
  ];

  return (
    <>
      {handleConfigs.map(({ direction, edgeType, children }) => (
        <ResizeHandle key={direction} id={id} direction={direction} edgeType={edgeType}>
          {children}
        </ResizeHandle>
      ))}
    </>
  );
};
