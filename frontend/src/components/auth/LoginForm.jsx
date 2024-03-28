import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useUserContext } from './UserContext';
import { login } from '../../api/authApi';

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
  const { signIn } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const performLogin = async (em, pass) => {
    try {
      setIsloading(true);
      const { data } = await login(em, pass);
      if (data.role === 'admin') {
        signIn(data);
        navigate('/home');
      } else {
        throw new Error('Tylko dla administratora!');
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err?.message);
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
          autoComplete="email"
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
          autoComplete="current-password"
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
