import { useState } from 'react';
import {
  Box, Grid, TextField, Button, Alert
} from '@mui/material';
import Spinner from '../Spinner/Spinner';
import HttpService from '../../services/httpService';
import { Header } from './style';

const Register = ({ setProgress }) => {
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameErrors, setNameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const reset = () => {
    setLoading(true);
    setSubmitted(true);
    setNameErrors([]);
    setEmailErrors([]);
    setPasswordErrors([]);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setProgress(0);
    reset();

    try {
      const response = await HttpService.post('register', {
        name: username,
        email,
        password
      }, false);

      setProgress(70);

      console.log(response.data);
      if (response.data.status.error) {
        const { validationErrors, message } = response.data.status;

        if (Object.keys(validationErrors).length > 0) {
          setErrorMessage(message);

          if (validationErrors.name) {
            setNameErrors(validationErrors.name);
          }

          if (validationErrors.email) {
            setEmailErrors(validationErrors.email);
          }

          if (validationErrors.password) {
            setPasswordErrors(validationErrors.password);
          }
        } else {
          setErrorMessage(message);
        }
      } else {
        setSuccessMessage(response.data.status.message);
      }

      setLoading(false);
      setProgress(100);
    } catch (error) {
      setLoading(false);
      setProgress(100);
      setErrorMessage(`Internal Server Error: ${error.response.data.status.message}`);
    }
  };

  return (
    <>
      <Box sx={{ textAlign: 'center' }} component="header" variant="h4" mt={12} mb={2}>
        <Header>
          Register
        </Header>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={4} xl={3}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              fullWidth
              error={submitted && nameErrors.length > 0}
              helperText={nameErrors.map((error) => (
                <div key={error}>{error}</div>
              ))}
              margin="normal"
            />
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
              Create Account
            </Button>
          </Box>
        </Grid>
      </Grid>
      {loading && <Spinner />}
    </>
  );
};

export default Register;
