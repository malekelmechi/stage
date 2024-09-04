// src/components/SignUp.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Root = styled('div')({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
});

const Paper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '15px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  padding: '20px',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: 'linear-gradient(to left, #BED3C3, #212E53)',
  color: 'white',
}));

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
          phoneNumber,
          address,
          role: 'user', // Role is fixed as 'user'
        }),
      });

      if (response.ok) {
        setSuccessMessage('Compte créé avec succès !');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        console.error('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  return (
    <Root>
      <Container component="main" maxWidth="xs">
        <Paper>
          <Typography component="h1" variant="h5"color ='#212E53' >
            Sign Up
          </Typography>
          {successMessage && (
            <Alert severity="success" style={{ marginBottom: '20px' }}>
              {successMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </SubmitButton>
          </form>
        </Paper>
      </Container>
    </Root>
  );
};

export default SignUp;