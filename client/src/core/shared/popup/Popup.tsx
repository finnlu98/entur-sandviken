import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Popup.css';

interface PopupProps {
  children: (closePopup: () => void) => React.ReactNode[] | React.ReactNode[];
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'center' | 'start' | 'end';
  surface?: 'surface';
  closePopupSeconds?: number;
  buttonHiearchy?: string;
}

const PopupButton: React.FC<PopupProps> = ({
  children,
  closePopupSeconds,
  position = 'top',
  align = 'center',
  surface = '',
  buttonHiearchy = 'primary',
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [cords, setCords] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closePopup = () => setShowPopup(false);
  const [trigger, content] = typeof children === 'function' ? children(closePopup) : children;

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 8;
    let top = rect.top - gap;
    let left = rect.left + rect.width / 2;

    if (position === 'bottom') {
      top = rect.bottom + gap;
    } else if (position === 'left') {
      top = rect.top + rect.height / 2;
      left = rect.left - gap;
    } else if (position === 'right') {
      top = rect.top + rect.height / 2;
      left = rect.right + gap;
    }

    if (position === 'top' || position === 'bottom') {
      if (align === 'start') {
        left = rect.left;
      } else if (align === 'end') {
        left = rect.right;
      }
    } else {
      if (align === 'start') {
        top = rect.top;
      } else if (align === 'end') {
        top = rect.bottom;
      }
    }

    setCords({
      top,
      left,
    });
  }, [align, position]);

  const handleClick = () => {
    updatePosition();

    setShowPopup((prev) => !prev);
  };

  useEffect(() => {
    if (!showPopup) return;

    updatePosition();

    const handleResize = () => updatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showPopup, updatePosition]);

  useEffect(() => {
    if (!showPopup) return;

    if (closePopupSeconds) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, closePopupSeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, closePopupSeconds]);

  useEffect(() => {
    if (!showPopup) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopup]);

  return (
    <div className="popup-container" ref={containerRef}>
      <button className={`popup-trigger ${buttonHiearchy}`} onClick={handleClick} ref={triggerRef}>
        {trigger}
      </button>
      {showPopup && (
        <div
          className={`popup popup-${position} popup-align-${align} ${surface}`}
          style={{ top: cords.top, left: cords.left }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default PopupButton;
