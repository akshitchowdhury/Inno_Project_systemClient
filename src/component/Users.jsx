



import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import CreateUsers from './CreateUsers/CreateUsers';

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const baseUrl = import.meta.env.VITE_API_URL;
    
  
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/users`, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${baseUrl}/projects/fetchProjects`, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjectList(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDeletion = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      setUserList(userList.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, [userList]);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusChip = (user) => {
    if (user.isLoggedIn) {
      return <Chip label="Online" color="success" size="small" />;
    } else if (user.isPresent === 'Leave') {
      return <Chip label="On Leave" color="error" size="small" />;
    } else {
      return <Chip label="Offline" color="default" size="small" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      <Typography variant="h4" gutterBottom component="h1" align="center">
        User Management Dashboard
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                {/* <TableCell>{user.role || 'N/A'}</TableCell> */}
                
                <TableCell>{user.department || 'N/A'}</TableCell>
                <TableCell>{getStatusChip(user)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(user)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletion(user._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <CreateUsers />
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="user-details-dialog"
      >
        <DialogTitle id="user-details-dialog">User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography><strong>Username:</strong> {selectedUser.username}</Typography>
              <Typography><strong>Password:</strong> {selectedUser.password}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Role:</strong> {selectedUser.role || 'N/A'}</Typography>
              <Typography><strong>Employee ID:</strong> {selectedUser.empId}</Typography>
              <Typography><strong>Department:</strong> {selectedUser.department || 'N/A'}</Typography>
              <Typography><strong>Work Mode:</strong> {selectedUser.isPresent}</Typography>
              <Typography><strong>Last Login:</strong> {formatDate(selectedUser.loggedInAt)}</Typography>
              <Typography><strong>Last Logout:</strong> {formatDate(selectedUser.loggedOutAt)}</Typography>
              <Typography>
                <strong>Assigned Project:</strong> {
                  projectList.find(project => project.assignedTo === selectedUser.username)?.projectName || 'N/A'
                }
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;