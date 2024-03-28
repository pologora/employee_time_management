import { Alert, Snackbar } from '@mui/material';
import { useNotificationContext } from '../../contexts/notificationContext';

export function NotificationAlert() {
  const { isOpen, notification } = useNotificationContext();
  if (isOpen) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={notification.hideDuration}
        open={isOpen}
      >
        <Alert
          severity={notification.severity}
          sx={{ width: '100%' }}
          variant={notification.variant}
        >
          {notification.text}
        </Alert>
      </Snackbar>
    );
  }
}
