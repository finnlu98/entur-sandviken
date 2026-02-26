import React from "react";
import { EditingKey } from "../model/EditMode";
import { Modal } from "../../shared/modal/modal";
import WidgetConfiguration from "../grid/widget/widget-configuration";
import ProfileOverview from "../../auth/ProfileOverview";
import LayoutTemplates from "../default/LayoutTemplates";
import type { WidgetEnum } from "../../../widgets/core/model/widget-type";

interface EditEntityProps {
  onClose: () => void;
  editKey: EditingKey | null;
}

const EditEntity: React.FC<EditEntityProps> = ({ onClose, editKey }) => {
  if (!editKey) return null;
  const isWidgetEdit = editKey !== EditingKey.layoutTemplate && editKey !== EditingKey.profile;

  return (
    <>
      {editKey && (
        <Modal open={!!editKey} onClose={onClose} title={`Configure ${editKey}`}>
          {isWidgetEdit && <WidgetConfiguration widget={editKey as unknown as WidgetEnum} onClose={onClose} />}
          {editKey === EditingKey.profile && <ProfileOverview />}
          {editKey === EditingKey.layoutTemplate && <LayoutTemplates />}
        </Modal>
      )}
    </>
  );
};

export default EditEntity;
