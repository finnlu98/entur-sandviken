import React from "react";
import { useDashboard } from "../../../context/dashboard-context";
import { CiEdit } from "react-icons/ci";
import "./edit-mode-button.css";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

const EditModeToggleButton: React.FC = () => {
  const { editMode, toggleEditMode, saveEdit, cancelEdit } = useDashboard();

  if (!editMode.editMode) {
    return (
      <button onClick={() => toggleEditMode()} className="edit-button" aria-label="Edit dashboard">
        <CiEdit />
      </button>
    );
  }

  return (
    <div className="edit-controls">
      <button onClick={cancelEdit} className="edit-button cancel" aria-label="Cancel changes">
        <IoMdClose />
      </button>
      <button onClick={saveEdit} className="edit-button active" aria-label="Save dashboard">
        <IoMdCheckmark />
      </button>
    </div>
  );
};

export default EditModeToggleButton;
