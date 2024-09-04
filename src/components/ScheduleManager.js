import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button ,Box} from '@mui/material';
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

const TableWrapper = styled(TableContainer)({
  maxWidth: '800px',
  marginTop: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
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

const ScheduleManager = () => {
  const [schedule, setSchedule] = useState([]);
  const [teachers, setTeachers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const scheduleResponse = await axios.get('http://localhost:8082/api/time-constraints');
        const scheduleData = scheduleResponse.data;

       
        const uniqueTeacherIds = [...new Set(scheduleData.map(constraint => constraint.teacherId))];

        
        const teacherResponses = await Promise.all(
          uniqueTeacherIds.map(id => axios.get(`http://localhost:8082/api/teachers/${id}`))
        );

        
        const teacherData = teacherResponses.reduce((acc, teacherResponse) => {
          const teacher = teacherResponse.data;
          acc[teacher.id] = `${teacher.firstName} ${teacher.lastName}`;
          return acc;
        }, {});

        setTeachers(teacherData);
        setSchedule(scheduleData);
      } catch (error) {
        console.error('Error fetching schedule or teachers:', error);
      }
    };

    fetchData();
  }, []);

  const getTeachersForTimeSlot = (day, period) => {
    return schedule
      .filter(constraint => constraint.day === day && constraint.period === period)
      .map(constraint => ({
        id: constraint.teacherId,
        name: teachers[constraint.teacherId] || 'Unknown Teacher'
      }));
  };

  const handleDelete = async (day, period, teacherId) => {
    try {
    
      const timeConstraintDTO = {
        day,
        period,
        teacherId,
      };

      
      await axios.delete('http://localhost:8082/api/time-constraints', { data: timeConstraintDTO });

    
      const response = await axios.get('http://localhost:8082/api/time-constraints');
      setSchedule(response.data);
    } catch (error) {
      console.error('Error deleting time constraint:', error);
    }
  };
  const handleNext = () => {
    navigate('/roommanager'); // Redirige vers RoomManager
  };

  return (
    <Root>
      <Content maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom color="#212E53">
          Schedule Manager
        </Typography>

        <TableWrapper component={Paper}>
          <Table>
            <TableBody>
              <StyledTableRow>
                <TableCell><Typography variant="body1">Day</Typography></TableCell>
                <TableCell><Typography variant="body1">Morning</Typography></TableCell>
                <TableCell><Typography variant="body1">Afternoon</Typography></TableCell>
              </StyledTableRow>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <StyledTableRow key={day}>
                  <TableCell><Typography variant="body1">{day}</Typography></TableCell>
                  <TableCell>
                    {getTeachersForTimeSlot(day, 'Morning').map(({ id, name }) => (
                      <div key={id}>
                        <Typography variant="body2">{name}</Typography>
                        <Button
                          variant="contained"
                          sx={{
                            background: 'linear-gradient(to left, #BED3C3, #212E53)', 
                            color: '#fff',
                            '&:hover': {
                              background: 'linear-gradient(to left, #9db3a8, #1b2647)', 
                            },
                          }}
                          
                          onClick={() => handleDelete(day, 'Morning', id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                    {getTeachersForTimeSlot(day, 'Morning').length === 0 && 'No teachers'}
                  </TableCell>
                  <TableCell>
                    {getTeachersForTimeSlot(day, 'Afternoon').map(({ id, name }) => (
                      <div key={id}>
                        <Typography variant="body2">{name}</Typography>
                        <Button
                          variant="contained"
                          sx={{
                            background: 'linear-gradient(to left, #BED3C3, #212E53)', 
                            color: '#fff', 
                            '&:hover': {
                              background: 'linear-gradient(to left, #9db3a8, #1b2647)', 
                            },
                          }}
                          onClick={() => handleDelete(day, 'Afternoon', id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                    {getTeachersForTimeSlot(day, 'Afternoon').length === 0 && 'No teachers'}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
        <Box >
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(to left, #BED3C3, #212E53)', 
              color: '#fff', }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Content>
    </Root>
  );
};

export default ScheduleManager;
