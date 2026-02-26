import React, { type ReactNode } from 'react';
import './modal.css';
import { IoMdClose } from 'react-icons/io';
import { createPortal } from 'react-dom';

type ModalProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
};

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  open,
  onClose,
  size = 'medium',
}) => {
  if (!open) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className={`modal-container ${size} h-column`} onClick={(e) => e.stopPropagation()}>
        <div className="h-row modal-title">
          {title && <div className="">{title}</div>}
          <button onClick={onClose} className="modal-close button-text-only large">
            <IoMdClose />
          </button>
        </div>
        <div className="modal-content h-column">{children}</div>
      </div>
    </div>,
    document.body
  );
};
