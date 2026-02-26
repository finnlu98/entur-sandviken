import { useAuth } from '../../../context/auth-context';
import { useDashboard } from '../../../context/dashboard-context';
import { EditingKey } from '../model/edit-mode';

const DefaultDashboardActions: React.FC = () => {
  const { user } = useAuth();
  const { toggleEditMode, setEditingKey } = useDashboard();
  return (
    <>
      <div className="h-column widget-container gap-medium">
        <div className="h-column center">
          <p>Welcome! 👋</p>
          <p>Start building your dashboard 🏠</p>
        </div>
        {!user && (
          <button className="secondary" onClick={() => setEditingKey(EditingKey.Profile)}>
            Log in
          </button>
        )}
        <button className="secondary" onClick={() => toggleEditMode()}>
          Edit Dashboard
        </button>
        <button className="secondary" onClick={() => setEditingKey(EditingKey.LayoutTemplate)}>
          Apply Template
        </button>
      </div>
    </>
  );
};
export default DefaultDashboardActions;
