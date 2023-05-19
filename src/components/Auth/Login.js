import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row, Col, Form, Button, Alert
} from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import HttpService from '../../services/httpService';
import {
  Header, Container, JustifyCenter, formButton
} from './style';

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
      <Header>Login</Header>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={8} lg={4} xl={3}>
            {errorMessage && (
              <Alert key="danger" variant="danger">
                {errorMessage}
              </Alert>
            )}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={submitted && emailErrors.length > 0}
                />
                <Form.Control.Feedback type="invalid">
                  {emailErrors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  isInvalid={submitted && passwordErrors.length > 0}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordErrors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" style={formButton} disabled={loading}>Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {loading && <Spinner />}
    </>
  );
};

export default Login;
