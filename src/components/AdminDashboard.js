import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  InputBase, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import logo from './image.jpg';
import { useNavigate } from 'react-router-dom';
import roomService from '../services/RoomService';
import teacherService from '../services/TeacherService';
import subjectService from '../services/SubjectService';
import groupService from '../services/GroupService';
import activityService from '../services/ActivityService';

const Root = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
});

const Sidebar = styled('div')({
  width: '250px',
  background: 'linear-gradient(to left, #BED3C3, #212E53)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px 0',
  color: 'white',
  position: 'relative',
});

const SidebarItem = styled(Typography)({
  width: '100%',
  padding: '15px 20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#405680',
  },
  color: 'white',
});


const ScheduleManagerButton = styled(Button)({
  position: 'absolute',
  bottom: '20px',
  width: '100%',
  background: '#212E53',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0d1a2b',
  },
});


const Content = styled('div')({
  flex: 1,
  padding: '20px',
});

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '1px 4px',
  margin: '20px 0',
  width: '300px',
  backgroundColor: '#fff',
  borderRadius: '4px',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
});

const StyledInputBase = styled(InputBase)({
  marginLeft: '8px',
  flex: 1,
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

const ActionsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const ButtonStyled = styled(Button)({
  background: 'linear-gradient(to left, #BED3C3, #212E53)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to left, #BED3C3, #1d2a4a)',
  },
  borderRadius: '4px',
  textTransform: 'none',
});

const Logo = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  marginBottom: '20px',
});

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load data only when the selected tab changes
    const fetchData = async () => {
      let result;
      try {
        switch (selectedTab) {
          case 'Teachers':
            result = await teacherService.getAllTeachers();
            break;
          case 'Rooms':
            result = await roomService.getAllRooms();
            break;
          case 'Subjects':
            result = await subjectService.getAllSubjects();
            break;
          case 'Groups':
            result = await groupService.getAllGroups();
            break;
          case 'Activities':
            result = await activityService.getAllActivities();
            
            break;
          default:
            result = { data: [] };
        }
        if (result && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error('Expected an array but received:', result.data);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    fetchData();
  }, [selectedTab]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleClickOpen = (item = null) => {
    setSelectedItem(item);
    setNewData(item || {});
    setEditMode(!!item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        // Update existing item
        switch (selectedTab) {
          case 'Teachers':
            await teacherService.updateTeacher(newData);
            break;
          case 'Rooms':
            await roomService.updateRoom(newData);
            break;
          case 'Subjects':
            await subjectService.updateSubject(newData);
            break;
          case 'Groups':
            await groupService.updateGroup(newData);
            break;
          case 'Activities':
            await activityService.updateActivity(newData);
            break;
          default:
            break;
        }
      } else {
        // Add new item
        switch (selectedTab) {
          case 'Teachers':
            await teacherService.createTeacher(newData);
            break;
          case 'Rooms':
            await roomService.createRoom(newData);
            break;
          case 'Subjects':
            await subjectService.createSubject(newData);
            break;
          case 'Groups':
            await groupService.createGroup(newData);
            break;
          case 'Activities':
            await activityService.createActivity(newData);
            break;
          default:
            break;
        }
      }
      setOpen(false);
      // Refresh data after submit
      const fetchData = async () => {
        let result;
        try {
          switch (selectedTab) {
            case 'Teachers':
              result = await teacherService.getAllTeachers();
              break;
            case 'Rooms':
              result = await roomService.getAllRooms();
              break;
            case 'Subjects':
              result = await subjectService.getAllSubjects();
              break;
            case 'Groups':
              result = await groupService.getAllGroups();
              break;
            case 'Activities':
              result = await activityService.getAllActivities();
              break;
            default:
              result = { data: [] };
          }
          if (result && Array.isArray(result.data)) {
            setData(result.data);
          } else {
            console.error('Expected an array but received:', result.data);
            setData([]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setData([]);
        }
      };

      fetchData();  // Refresh data after submit
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        switch (selectedTab) {
          case 'Teachers':
            await teacherService.deleteTeacher(selectedItem.id);
            break;
          case 'Rooms':
            await roomService.deleteRoom(selectedItem.id);
            break;
          case 'Subjects':
            await subjectService.deleteSubject(selectedItem.id);
            break;
          case 'Groups':
            await groupService.deleteGroup(selectedItem.id);
            break;
          case 'Activities':
            await activityService.deleteActivity(selectedItem.id);
            break;
          default:
            break;
        }
        // Refresh data after delete
        const fetchData = async () => {
          let result;
          try {
            switch (selectedTab) {
              case 'Teachers':
                result = await teacherService.getAllTeachers();
                break;
              case 'Rooms':
                result = await roomService.getAllRooms();
                break;
              case 'Subjects':
                result = await subjectService.getAllSubjects();
                break;
              case 'Groups':
                result = await groupService.getAllGroups();
                break;
              case 'Activities':
                result = await activityService.getAllActivities();
                break;
              default:
                result = { data: [] };
            }
            if (result && Array.isArray(result.data)) {
              setData(result.data);
            } else {
              console.error('Expected an array but received:', result.data);
              setData([]);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setData([]);
          }
        };

        fetchData();
        setSelectedItem(null);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const renderFormFields = () => {
    switch (selectedTab) {
      case 'Teachers':
        return (
          <>
            <TextField name="firstName" label="First Name" fullWidth margin="dense" value={newData.firstName || ''} onChange={handleChange} />
            <TextField name="lastName" label="Last Name" fullWidth margin="dense" value={newData.lastName || ''} onChange={handleChange} />
            <TextField name="email" label="Email" fullWidth margin="dense" value={newData.email || ''} onChange={handleChange} />
            <TextField name="phoneNumber" label="Phone Number" fullWidth margin="dense" value={newData.phoneNumber || ''} onChange={handleChange} />
            <TextField name="address" label="Address" fullWidth margin="dense" value={newData.address || ''} onChange={handleChange} />
            <TextField name="username" label="Username" fullWidth margin="dense" value={newData.username || ''} onChange={handleChange} />
            <TextField name="password" label="Password" type="password" fullWidth margin="dense" value={newData.password || ''} onChange={handleChange} />
          </>
        );
      case 'Rooms':
        return (
          <>
            <TextField name="name" label="Name" fullWidth margin="dense" value={newData.name || ''} onChange={handleChange} />
            <TextField name="capacity" label="Capacity" fullWidth margin="dense" value={newData.capacity || ''} onChange={handleChange} />
          </>
        );
      case 'Subjects':
        return (
          <>
            <TextField name="name" label="Name" fullWidth margin="dense" value={newData.name || ''} onChange={handleChange} />
            <TextField name="credit" label="Credit" fullWidth margin="dense" value={newData.credit || ''} onChange={handleChange} />
          </>
        );
      case 'Groups':
        return (
          <>
            <TextField name="name" label="Name" fullWidth margin="dense" value={newData.name || ''} onChange={handleChange} />
            <TextField name="studentCount" label="StudentCount" fullWidth margin="dense" value={newData.studentCount || ''} onChange={handleChange} />
          </>
        );
      case 'Activities':
        return (
          <>
            <TextField name="teacherName" label="Teacher Name" fullWidth margin="dense" value={newData.teacherName || ''} onChange={handleChange} />
            <TextField name="roomName" label="Room Name" fullWidth margin="dense" value={newData.roomName || ''} onChange={handleChange} />
            <TextField name="subjectName" label="Subject Name" fullWidth margin="dense" value={newData.subjectName || ''} onChange={handleChange} />
            <TextField name="groupName" label="Group Name" fullWidth margin="dense" value={newData.groupName || ''} onChange={handleChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Root>
      <Sidebar>
        <Logo src={logo} alt="Logo" />
        <SidebarItem onClick={() => handleTabChange('Teachers')}>Teachers</SidebarItem>
        <SidebarItem onClick={() => handleTabChange('Rooms')}>Rooms</SidebarItem>
        <SidebarItem onClick={() => handleTabChange('Subjects')}>Subjects</SidebarItem>
        <SidebarItem onClick={() => handleTabChange('Groups')}>Groups</SidebarItem>
        <SidebarItem onClick={() => handleTabChange('Activities')}>Activities</SidebarItem>
        <ScheduleManagerButton onClick={() => navigate('/schedule')}>Schedule Manager</ScheduleManagerButton>
        
      </Sidebar>
      <Content>
        <Header>
          <Typography variant="h4" gutterBottom color='#212E53'>
            {selectedTab} {" Overview"}
          </Typography>
          <SearchContainer>
            <SearchIcon />
            <StyledInputBase placeholder="Search…" />
          </SearchContainer>
          <ButtonStyled onClick={() => handleClickOpen()}>Add New</ButtonStyled>
        </Header>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {selectedTab === 'Teachers' && (
                  <>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Actions</TableCell>
                  </>
                )}
                {selectedTab === 'Rooms' && (
                  <>
                    <TableCell>Name</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Actions</TableCell>
                  </>
                )}
                {selectedTab === 'Subjects' && (
                  <>
                    <TableCell>Name</TableCell>
                    <TableCell>Credit</TableCell>
                    <TableCell>Actions</TableCell>
                  </>
                )}
                {selectedTab === 'Groups' && (
                  <>
                    <TableCell>Name</TableCell>
                    <TableCell>StudentCount</TableCell>
                    <TableCell>Actions</TableCell>
                  </>
                )}
                {selectedTab === 'Activities' && (
                  <>
                    <TableCell>Teacher Name</TableCell>
                    <TableCell>Room Name</TableCell>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Group Name</TableCell>
        
                    <TableCell>Actions</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {selectedTab === 'Teachers' && (
                    <>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phoneNumber}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.username}</TableCell>
                      <TableCell>{item.password}</TableCell>
                    </>
                  )}
                  {selectedTab === 'Rooms' && (
                    <>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.capacity}</TableCell>
                    </>
                  )}
                  {selectedTab === 'Subjects' && (
                    <>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.credit}</TableCell>
                    </>
                  )}
                  {selectedTab === 'Groups' && (
                    <>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.studentCount}</TableCell>
                    </>
                  )}
                  {selectedTab === 'Activities' && (
                    <>
                      <TableCell>{item.teacherName}</TableCell>
                      <TableCell>{item.roomName}</TableCell>
                      <TableCell>{item.subjectName}</TableCell>
                      <TableCell>{item.groupName}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <ActionsContainer>
                      <ButtonStyled onClick={() => handleClickOpen(item)}>Edit</ButtonStyled>
                      <ButtonStyled onClick={() => { setSelectedItem(item); handleDelete(); }}>Delete</ButtonStyled>
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? 'Edit' : 'Add New'} {selectedTab.slice(0, -1)}</DialogTitle>
          <DialogContent>
            {renderFormFields()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Content>
    </Root>
  );
};

export default AdminDashboard;