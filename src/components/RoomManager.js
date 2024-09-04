import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const RoomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  margin: '5px',
  borderRadius: '8px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '300px',
});

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [roomAssignments, setRoomAssignments] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer toutes les salles
        const roomsResponse = await axios.get('http://localhost:8082/api/rooms');
        const roomsData = roomsResponse.data;

        // Récupérer les contraintes de salles
        const constraintsResponse = await axios.get('http://localhost:8082/api/room-constraints');
        const constraintsData = constraintsResponse.data;

        // Organiser les contraintes par salle
        const assignmentsByRoom = constraintsData.reduce((acc, item) => {
          if (!acc[item.room]) acc[item.room] = [];
          acc[item.room].push(item.teacher);
          return acc;
        }, {});

        console.log('Rooms:', roomsData);
        console.log('Assignments by Room:', assignmentsByRoom);

        setRooms(roomsData); // Garder toutes les salles
        setRoomAssignments(assignmentsByRoom);
      } catch (error) {
        console.error('Error fetching room assignments:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    navigate('/nextpage'); // Remplacez par le chemin correct de la page suivante
  };

  return (
    <Root>
      <Content maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom color="#212E53">
          Room Manager
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ gap: '15px' }}
        >
          {rooms.map(room => (
            <RoomBox key={room.id}>
              <Typography variant="h6">{room.name}</Typography>
              {roomAssignments[room.name] && roomAssignments[room.name].length > 0 ? (
                roomAssignments[room.name].map(teacher => (
                  <Typography key={teacher.id} variant="body1">
                    {teacher.firstName} {teacher.lastName}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">No teachers assigned</Typography>
              )}
            </RoomBox>
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(to left, #BED3C3, #212E53)', 
            color: '#fff', }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Content>
    </Root>
  );
};

export default RoomManager;
