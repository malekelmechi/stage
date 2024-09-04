import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControlLabel, Checkbox, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Assurez-vous que le chemin est correct
import roomService from '../services/RoomConstraintService';

const Root = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(to left, #BED3C3, #212E53)',
});

const Content = styled(Container)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
});

const ButtonContainer = styled(Box)({
  marginTop: '20px',
  display: 'flex',
  gap: '10px',
});

const RoomBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  margin: '5px',
  borderRadius: '8px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '300px',
});

const RoomConstraints = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { currentUser } = useUser(); // Utilisation du contexte pour obtenir l'utilisateur courant
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getAllRooms();
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleCheckboxChange = (event) => {
    const roomId = event.target.name;
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((r) => r !== roomId) : [...prev, roomId]
    );
  };

  const handlePrevious = () => {
    navigate('/timeconstraints');
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      console.error('User not found');
      return;
    }
  
    try {
      // Boucler sur chaque salle sélectionnée et envoyer une requête séparée pour chacune
      for (const roomId of selectedRooms) {
        const constraintData = { room: roomId }; // Envoyer une seule salle à la fois
        console.log('Data sent to the backend:', constraintData);
        await roomService.createRoomConstraint(currentUser.id, constraintData);
      }
      navigate('/'); // Redirection après la soumission
    } catch (error) {
      console.error('Error submitting room constraints:', error);
    }
  };
  return (
    <Root>
      <Content maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom color="#212E53">
          Room Constraints
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ gap: '15px' }}
        >
          {rooms.map(room => (
            <RoomBox key={room.id}>
              <Typography variant="body1" sx={{ flex: 1, marginRight: '10px' }}>{room.name}</Typography>
              <FormControlLabel
                control={<Checkbox name={room.id.toString()} color="primary" onChange={handleCheckboxChange} />}
                label=""
                sx={{ margin: 0 }}
              />
            </RoomBox>
          ))}
        </Box>

        <ButtonContainer>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FFFFFF', color: '#000000', '&:hover': { backgroundColor: '#F0F0F0' } }}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FFFFFF', color: '#000000', '&:hover': { backgroundColor: '#F0F0F0' } }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ButtonContainer>
      </Content>
    </Root>
  );
};

export default RoomConstraints;
