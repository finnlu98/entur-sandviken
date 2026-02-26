import { useDashboard } from "../../../context/dashboard-context";
import "./layout-templates.css";
import { useState } from "react";
import defaultTemplate from "./templates/default-template";

const LayoutTemplates: React.FC = () => {
  const [layoutSelected, setLayoutSelected] = useState<boolean>(false);
  const { setWidgets, setEditingKey } = useDashboard();

  function applyDefaultTemplate() {
    if (!layoutSelected) return;
    setWidgets(defaultTemplate);
    setEditingKey(null);
  }

  return (
    <div className="layout-templates">
      <div
        className={`square layout-square${layoutSelected ? " selected" : ""}`}
        onClick={() => setLayoutSelected(!layoutSelected)}
      >
        Default layout
      </div>
      <div className="action-buttons-layout">
        <button onClick={applyDefaultTemplate} disabled={!layoutSelected}>
          Apply Template
        </button>
      </div>
    </div>
  );
};
export default LayoutTemplates;
