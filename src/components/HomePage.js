// src/components/HomePage.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import Header from './Header'; 
import WelcomeImage from './welcome-image.jpg'; 

const Root = styled('div')({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
});

const Content = styled(Container)({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px 10px', 
  maxWidth: '100%', 
});

const TextContainer = styled(Box)({
  flex: 1,
  paddingRight: '0px',
  marginLeft: '1px', 
 // Ajoutez une marge gauche pour décaler le texte
});

const ImageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
});

const HomePage = () => {
  return (
    <Root>
      <Header />
      <Content>
        <TextContainer>
          <Typography variant="h2" component="h1" gutterBottom style={{ color: '#212E53' }}>
            Découvrez une nouvelle ère dans la planification scolaire
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Bienvenue sur notre plateforme innovante pour la gestion des emplois du temps.
          </Typography>
        </TextContainer>
        <ImageContainer>
          <img src={WelcomeImage} alt="Calendar Illustration" style={{ maxWidth: '120%', height: 'auto' }} />
        </ImageContainer>
      </Content>
    </Root>
  );
};

export default HomePage;
