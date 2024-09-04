import React, { useState } from 'react';
import { TextField, Button, Container, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import welcomeImage from './welcome-image.jpg';

const Root = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
});

const Paper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '15px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
});

const FormContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
}));

const WelcomeContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(to left, #BED3C3, #212E53)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
}));

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: 'linear-gradient(to left, #BED3C3, #212E53)',
  color: 'white',
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8082/api/teachers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        console.log('User set:', data); // Ajoutez cette ligne pour vérifier les données
        navigate(data.role === 'admin' ? '/admin' : '/timeconstraints');
      } else {
        const errorText = await response.text();
        setError(`Error ${response.status}: ${errorText || 'Invalid username or password'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setError('A network error occurred. Please try again.');
    }
  };

  return (
    <Root>
      <Container component="main" maxWidth="md">
        <Paper>
          <FormContainer>
            <Typography component="h1" variant="h5" color='#212E53'>
              Login to EduSched
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember Me"
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
              >
                Login
              </SubmitButton>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </form>
          </FormContainer>
          <WelcomeContainer>
            <Typography variant="h4" align="center">
              Welcome to EduSched
            </Typography>
            <Image src={welcomeImage} alt="Welcome" />
          </WelcomeContainer>
        </Paper>
      </Container>
    </Root>
  );
};

export default Login;
