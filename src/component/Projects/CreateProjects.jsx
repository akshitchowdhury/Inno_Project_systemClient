import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CreateProjects = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDomain, setProjectDomain] = useState('');
  const [projectClient, setProjectClient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userList, setUserList] = useState([]);
  const [assignedUser, setAssignedUser] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchProjects = async () => {
    try {
      const response = await fetch('/projects/fetchProjects', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      showSnackbar('Could not load projects. Please try again.', 'error');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/users", { method: "GET" });
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showSnackbar('Could not load users. Please try again.', 'error');
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const projectData = {
      projectName,
      projectDescription,
      projectDomain,
      projectClient,
      assignedTo: assignedUser,
      projectStatus: false
    };

    try {
      const response = await fetch('/projects/addProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error('Failed to create project');

      await response.json();
      showSnackbar('Project created successfully', 'success');
      setProjectName('');
      setProjectDescription('');
      setProjectDomain('');
      setProjectClient('');
      setAssignedUser('');
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      showSnackbar('Failed to create project. Please check your input.', 'error');
    }
  };

  const handleDeletion = async (id) => {
    try {
      const response = await fetch(`/projects/delProject/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error('Failed to delete project');
      setProjects(projects.filter((project) => project._id !== id));
      showSnackbar('Project deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting project:', error);
      showSnackbar('Failed to delete project', 'error');
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const updatedStatus = !currentStatus;
    try {
      const response = await fetch(`/projects/updateStatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectStatus: updatedStatus }),
      });

      if (!response.ok) throw new Error("Failed to update project status");

      await response.json();
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? { ...project, projectStatus: updatedStatus } : project
        )
      );
      showSnackbar('Project status updated successfully', 'success');
    } catch (error) {
      console.error("Error updating project status:", error);
      showSnackbar('Failed to update project status', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6, px: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Create New Project
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 6 }}>
        <Table sx={{ minWidth: 650 }} aria-label="projects table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={project._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.projectClient}</TableCell>
                <TableCell>{project.assignedTo}</TableCell>
                <TableCell>{project.projectDomain}</TableCell>
                <TableCell>{project.projectDescription}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleStatusToggle(project._id, project.projectStatus)}>
                    {project.projectStatus ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon color="warning" />}
                  </IconButton>
                  {project.projectStatus ? 'Completed' : 'Ongoing'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeletion(project._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Add New Project
        </Typography>
        <form onSubmit={handleSubmission}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Client Name"
                value={projectClient}
                onChange={(e) => setProjectClient(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Domain"
                value={projectDomain}
                onChange={(e) => setProjectDomain(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="assign-user-label">Assign To</InputLabel>
                <Select
                  labelId="assign-user-label"
                  value={assignedUser}
                  onChange={(e) => setAssignedUser(e.target.value)}
                  label="Assign To"
                  required
                >
                  {userList.map((user) => (
                    <MenuItem key={user._id} value={user.username}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Project
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateProjects;