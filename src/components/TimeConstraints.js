import React, { useState } from 'react';
import { Container, Typography, FormControlLabel, Checkbox, Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import timeConstraintService from '../services/TimeConstraintService';

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

const TableWrapper = styled(TableContainer)({
  maxWidth: '800px',
  marginTop: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
});

const Note = styled(Typography)({
  color: 'white',
  fontStyle: 'italic',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
  '&:not(:last-child)': {
    borderBottom: '1px solid #ddd',
  },
});

const TimeConstraints = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useUser(); // Récupère currentUser du contexte

  console.log('Current User:', currentUser); // Vérifie les données utilisateur

  const handleCheckboxChange = (event) => {
    const timeSlot = event.target.name;
    setSelectedTimes((prev) =>
      prev.includes(timeSlot) ? prev.filter((slot) => slot !== timeSlot) : [...prev, timeSlot]
    );
  };

  const handleNext = async () => {
    if (!currentUser || !currentUser.id) {
      console.error('No user is currently logged in.');
      alert('No user is currently logged in.');
      return;
    }

    if (selectedTimes.length < 4) {
      alert('Please select at least 4 time slots.');
      return;
    }

    try {
      const constraints = selectedTimes.map(timeSlot => {
        const [day, period] = timeSlot.split(/(?=[A-Z])/);
        return { day, period };
      });

      await Promise.all(
        constraints.map(constraint =>
          timeConstraintService.createTimeConstraint(constraint, currentUser.id)
        )
      );

      navigate('/roomconstraints');
    } catch (error) {
      console.error('Error submitting time constraints:', error);
      alert('An error occurred while submitting your time constraints. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Root>
      <Content maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom color="#212E53">
          Time Constraints
        </Typography>

        <Note>
          NB : Please select at least 4 time slots!
        </Note>

        <TableWrapper component={Paper}>
          <Table>
            <TableBody>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <StyledTableRow key={day}>
                  <TableCell><Typography variant="body1">{day}</Typography></TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={<Checkbox name={`${day}Morning`} color="primary" onChange={handleCheckboxChange} />}
                      label="Morning"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={<Checkbox name={`${day}Afternoon`} color="primary" onChange={handleCheckboxChange} />}
                      label="Afternoon"
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        <ButtonContainer>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FFFFFF', color: '#000000', '&:hover': { backgroundColor: '#F0F0F0' } }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FFFFFF', color: '#000000', '&:hover': { backgroundColor: '#F0F0F0' } }}
            onClick={handleNext}
          >
            Next
          </Button>
        </ButtonContainer>
      </Content>
    </Root>
  );
};

export default TimeConstraints;
