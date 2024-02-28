import {
  Box,
  Button, CircularProgress, Paper, Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteUserById, getUserById, updateUserById } from '../../api/usersApi';
import BooleanAlert from '../shared/BooleanAlert';
import { useNotificationContext } from '../../contexts/notificationContext';
import { UserDetailFieldWithUpdate } from './UserDetailFieldWithUpdate';

export function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const { handleChangeNotification } = useNotificationContext();

  const sendSuccessNotificationDeleteUser = () => {
    const message = { text: 'Użytkownik został usunięty' };
    handleChangeNotification(message);
  };
  const sendErrorNotificationDeleteUser = () => {
    const message = { text: 'Użytkownik nie został usunięty', severity: 'error' };
    handleChangeNotification(message);
  };
  const sendErrorNotificationUpdateUser = () => {
    const message = { text: 'Zmiany nie zostały zapisane', severity: 'error' };
    handleChangeNotification(message);
  };
  const sendSuccessNotificationUpdateUser = () => {
    const message = { text: 'Zmiany zostały zapisane' };
    handleChangeNotification(message);
  };

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryFn: () => getUserById(id),
    queryKey: ['user', id],
  });
  const user = data?.data;

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteUserById(id),
    onError: () => {
      sendErrorNotificationDeleteUser();
    },
    onSuccess: () => {
      setIsOpenDeleteAlert(false);
      sendSuccessNotificationDeleteUser();
      navigate('/users');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values) => updateUserById(user._id, values),
    onError: () => {
      sendErrorNotificationUpdateUser();
    },
    onSuccess: () => {
      sendSuccessNotificationUpdateUser();
      refetch();
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(user._id);
  };

  const handleDeleteClick = () => {
    setIsOpenDeleteAlert(true);
  };

  const handleUpdate = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {isOpenDeleteAlert && (
      <BooleanAlert
        open={isOpenDeleteAlert}
        setOpen={setIsOpenDeleteAlert}
        onAccept={handleDelete}
        title="Usuwanie użytkownika"
        content={`Czy napewno chcecz usunąć użytkownika: ${user.name} ${user.surname}`}
        acceptText="usuń"
        color="error"
      />
      )}
      <Button onClick={() => navigate('/users')} startIcon={<ArrowBackRoundedIcon />}>wstecz</Button>
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography className="bold" component="span" fontWeight={700}>text</Typography>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <div className="userDetailFieldsContainer">
          <Typography variant="body1">
            Imię:
          </Typography>
          <Typography className="bold" fontWeight={700}>{user.name}</Typography>
        </div>
        <div className="userDetailFieldsContainer">
          <Typography variant="body1">
            Nazwisko:
          </Typography>
          <Typography className="bold" fontWeight={700}>{user.surname}</Typography>
        </div>
        <UserDetailFieldWithUpdate
          title="Email"
          value={user.email}
          update={handleUpdate}
          name="email"
        />
        <div className="userDetailFieldsContainer">
          <Typography variant="body1">
            Role:
          </Typography>
          <Typography className="bold" component="span" fontWeight={700}>{user.role}</Typography>
        </div>
        <Box marginTop={2}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
          >
            Delete User
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
