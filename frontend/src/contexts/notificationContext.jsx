import {
  createContext, useEffect, useState,
} from 'react';

import { getSafeContext } from './getSafeContext';

const NotificationContext = createContext(null);

const DEFAULT_TIMEOUT_DURATION = 2000;

function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState({
    severity: 'success',
    variant: 'outlined',
    text: '',
    hideDuration: DEFAULT_TIMEOUT_DURATION,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [timeoutDuraton, setTimeoutDuration] = useState(DEFAULT_TIMEOUT_DURATION);

  const handleChangeNotification = (options) => {
    const {
      text,
      severity = 'success',
      variant = 'filled',
      hideDuration = timeoutDuraton,
    } = options;
    setNotification({
      text, severity, variant, hideDuration,
    });
    setIsOpen(true);
  };

  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, timeoutDuraton);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, timeoutDuraton]);

  return (
    <NotificationContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        handleChangeNotification,
        isOpen,
        notification,
        setTimeoutDuration,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
export default NotificationContextProvider;

export const useNotificationContext = getSafeContext(NotificationContext, 'NotificationContext');
