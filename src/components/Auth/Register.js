import { useState } from 'react';
import {
  Row, Col, Form, Button, Alert
} from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import HttpService from '../../services/httpService';
import {
  Header, Container, JustifyCenter, formButton
} from './style';

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
      <Header>Register</Header>
      <Container>
        <Row style={JustifyCenter}>
          <Col sm={12} md={8} lg={4} xl={3}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  isInvalid={submitted && nameErrors.length > 0}
                />
                <Form.Control.Feedback type="invalid">
                  {nameErrors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </Form.Control.Feedback>
              </Form.Group>
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
              <Button variant="primary" type="submit" style={formButton} disabled={loading}>Create Account</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {loading && <Spinner />}
    </>
  );
};

export default Register;
