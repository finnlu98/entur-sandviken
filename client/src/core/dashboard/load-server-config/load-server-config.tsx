import { ImInfo } from "react-icons/im";
import { Modal } from "../../shared/modal/modal";

interface LoadServerConfigProps {
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
}

const LoadServerConfig: React.FC<LoadServerConfigProps> = ({ isOpen = false, onClose, onConfirm }) => {
  function handleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={onClose} size="small">
      <div className="h-column gap-large">
        <h4 className="h-row">
          <ImInfo /> There exist a design on your profile
        </h4>
        <p>You made changes before signing in. Do you want to keep the old design or replace it with the new one?</p>

        <div className="h-row">
          <button onClick={handleConfirm}>Keep Old Design</button>
          <button onClick={onClose}>Use new design</button>
        </div>
      </div>
    </Modal>
  );
};

export default LoadServerConfig;
