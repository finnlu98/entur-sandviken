import { useDashboard } from '../../../context/dashboard-context';
import type { EditingKey } from '../../../core/dashboard/model/EditMode';
import type { WidgetEnum } from '../model/widget-type';

interface EditWidgetProps {
  widgetKey: WidgetEnum;
}

const EditWidget: React.FC<EditWidgetProps> = ({ widgetKey }) => {
  const { editMode, toggleEditMode, setEditingKey } = useDashboard();

  function handleEditClick() {
    if (!editMode.editMode) {
      toggleEditMode(widgetKey as unknown as EditingKey);
    } else {
      setEditingKey(widgetKey as unknown as EditingKey);
    }
  }

  return (
    <div className="h-column">
      <p>Configuration is missing for {widgetKey}</p>
      <button
        className="secondary"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={handleEditClick}
      >
        Edit widgets
      </button>
    </div>
  );
};

export default EditWidget;
