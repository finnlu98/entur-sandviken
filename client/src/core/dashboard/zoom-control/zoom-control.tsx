import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { TbZoomScan } from "react-icons/tb";
import "./zoom-control.css";
import { useDashboard } from "../../../context/dashboard-context";
import { useEffect } from "react";

interface ZoomControlProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ zoom, onZoomChange }) => {
  const { editMode } = useDashboard();
  const { dashboardSize } = useDashboard();
  const handleZoomIn = () => onZoomChange(Math.min(zoom + 0.1, 2));
  const handleZoomOut = () => onZoomChange(Math.max(zoom - 0.1, 0.5));

  const handleZoomToFit = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const scaleX = viewportWidth / dashboardSize.width;
    const scaleY = viewportHeight / dashboardSize.height;

    const fitZoom = Math.min(scaleX, scaleY, 2);
    onZoomChange(Math.max(fitZoom, 0.5));
  };

  useEffect(() => {
    handleZoomToFit();
  }, [dashboardSize]);

  return (
    <>
      {editMode.editMode && (
        <div className="zoom-controls h-column animate-appear">
          <button onClick={handleZoomIn}>
            <MdOutlineZoomIn />
          </button>
          <button onClick={handleZoomToFit}>
            <TbZoomScan />
          </button>
          <button onClick={handleZoomOut}>
            <MdOutlineZoomOut />
          </button>
        </div>
      )}
    </>
  );
};

export default ZoomControl;
