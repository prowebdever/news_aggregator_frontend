import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, TextField, Button, Alert
} from '@mui/material';
import Spinner from '../Spinner/Spinner';
import HttpService from '../../services/httpService';
import { Header } from './style';

const Login = ({ setProgress, setLoggedIn }) => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  const reset = () => {
    setLoading(true);
    setSubmitted(true);
    setEmailErrors([]);
    setPasswordErrors([]);
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setProgress(15);
    reset();

    try {
      const response = await HttpService.post('login', { email, password }, false);
      console.log('response', response);
      setProgress(70);

      if (response.data.status.error) {
        setErrorMessage(response.data.status.message);
      } else {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('preferred_authors', response.data.data.user.preferred_authors);
        localStorage.setItem('preferred_categories', response.data.data.user.preferred_categories);
        localStorage.setItem('preferred_sources', response.data.data.user.preferred_sources);
        setLoggedIn(true);
        setTimeout(() => {
          navigate('/');
        }, 300);
      }

      setLoading(false);
      setProgress(100);
    } catch (error) {
      setErrorMessage(`Internal Server Error: ${error.response.data.status.message}`);
      setLoading(false);
      setProgress(100);
    }
  };

  return (
    <>
      <Box sx={{ textAlign: 'center' }} component="header" variant="h4" mt={12} mb={2}>
        <Header>
          Login
        </Header>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={4} xl={3}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              error={submitted && emailErrors.length > 0}
              helperText={emailErrors.map((error) => (
                <div key={error}>{error}</div>
              ))}
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              error={submitted && passwordErrors.length > 0}
              helperText={passwordErrors.map((error) => (
                <div key={error}>{error}</div>
              ))}
              margin="normal"
            />
            <Button variant="contained" type="submit" disabled={loading} fullWidth>
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
      {loading && <Spinner />}
    </>
  );
};

export default Login;
