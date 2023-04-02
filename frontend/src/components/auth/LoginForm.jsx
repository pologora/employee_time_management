import { useState } from 'react';
import * as Realm from 'realm-web';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import app from '../../options/realmConfig';
import { useUser } from './UserContext';

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(8)};
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

const ErrorText = styled(Typography)`
  color: red;
`;

function LoginForm() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const performLogin = async (em, pass) => {
    try {
      setIsloading(true);
      const user = await app.logIn(Realm.Credentials.emailPassword(em, pass));
      setUser(user);
      navigate('/app');
    } catch (err) {
      if (err.statusCode === 401) {
        setError('Nieprawidłowa nazwa użytkownika lub hasło.');
      } else {
        setError('Wystąpił błąd. Spróbuj ponownie później.');
      }
    } finally {
      setIsloading(false);
    }
  };
  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    performLogin(email, password);
  };

  const handleDemoLogin = async () => {
    const emailDemo = process.env.REACT_APP_USER_EMAIL || '';
    const passwordDemo = process.env.REACT_APP_USER_PASSWORD || '';
    performLogin(emailDemo, passwordDemo);
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledForm onSubmit={handleLogin}>
        <Typography variant="h4">Login</Typography>
        {error && <ErrorText variant="body1">{error}</ErrorText>}
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          color="primary"
        >
          Log In
        </LoadingButton>

        {process.env.REACT_APP_USER_EMAIL && (
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={handleDemoLogin}
          >
            Demo user
          </LoadingButton>
        )}
      </StyledForm>
    </StyledContainer>
  );
}

export default LoginForm;
