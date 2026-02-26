import React from 'react';
import { EditingKey } from '../model/edit-mode';
import { Modal } from '../../shared/modal/modal';
import WidgetConfiguration from '../grid/widget/widget-configuration';
import ProfileOverview from '../../auth/profile-overview';
import LayoutTemplates from '../default/layout-templates';
import type { WidgetEnum } from '../../../widgets/core/model/widget-type';

interface EditEntityProps {
  onClose: () => void;
  editKey: EditingKey | null;
}

const EditEntity: React.FC<EditEntityProps> = ({ onClose, editKey }) => {
  if (!editKey) return null;
  const isWidgetEdit = editKey !== EditingKey.LayoutTemplate && editKey !== EditingKey.Profile;

  return (
    <>
      {editKey && (
        <Modal open={!!editKey} onClose={onClose} title={`Configure ${editKey}`}>
          {isWidgetEdit && (
            <WidgetConfiguration widget={editKey as unknown as WidgetEnum} onClose={onClose} />
          )}
          {editKey === EditingKey.Profile && <ProfileOverview />}
          {editKey === EditingKey.LayoutTemplate && <LayoutTemplates />}
        </Modal>
      )}
    </>
  );
};

export default EditEntity;
