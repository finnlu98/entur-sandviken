import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AlertVariant, type AlertItem } from '../model/alert-types';
import AlertContainer from '../component/alert';
type AlertContextValue = {
  showAlert: (message: string, variant?: AlertVariant, durationMs?: number) => string;
  removeAlert: (id: string) => void;
};

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const showAlert = useCallback(
    (message: string, variant: AlertVariant = AlertVariant.INFO, durationMs: number = 3000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setAlerts((prev) => [...prev, { id, message, variant }]);

      if (durationMs > 0) {
        window.setTimeout(() => removeAlert(id), durationMs);
      }

      return id;
    },
    [removeAlert]
  );

  const value = useMemo(() => ({ showAlert, removeAlert }), [showAlert, removeAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertContainer alerts={alerts} onDismiss={removeAlert} />
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextValue => {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return ctx;
};
