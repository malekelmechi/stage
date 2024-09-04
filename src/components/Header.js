// src/components/Header.js
import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import logo from './image.jpg';

const TopBar = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 10px',
  backgroundColor: 'white',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '10px', // Ajoute un espace entre les boutons
});

const LoginButton = styled(Button)({
  background: 'linear-gradient(to left, #BED3C3, #212E53)',
  color: 'white',
});

const SignUpButton = styled(Button)({
  background: 'linear-gradient(to left, #212E53, #BED3C3)', // Inverse les couleurs
  color: 'white',
});

const Header = () => {
  return (
    <TopBar>
      <img src={logo} alt="EduSched Logo" style={{ height: '100px' }} />
      <ButtonContainer>
        <LoginButton variant="contained" href="/signin">
          LOGIN
        </LoginButton>
        <SignUpButton variant="contained" href="/signup">
          SIGN UP
        </SignUpButton>
      </ButtonContainer>
    </TopBar>
  );
};

export default Header;
