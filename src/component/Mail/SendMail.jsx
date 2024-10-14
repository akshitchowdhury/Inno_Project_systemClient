import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Container,
  Snackbar,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const SendMail = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [chosenUser, setChosenUser] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
const baseUrl = import.meta.env.VITE_API_URL;
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/users`, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.filter(user => user.username !== "ADMIN"));
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!chosenUser) {
      setError('Please select a recipient');
      return;
    }
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    const data = { 
      sender_email: "parameshp@innotech.co", 
      receiver_username: chosenUser, 
      messages: [message]
    };

    try {
      const sendData = await fetch(`${baseUrl}/messages/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!sendData.ok) throw new Error('Failed to send message');

      await sendData.json();
      setSuccess(`Message sent successfully to ${chosenUser}!`);
      setMessage('');
      setChosenUser('');
      setError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccess(null);
    setError(null);
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
          Compose Message
        </Typography>
        <Box component="form" onSubmit={handleSubmission} sx={{ mt: 3 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="recipient-select-label">Recipient</InputLabel>
            <Select
              labelId="recipient-select-label"
              value={chosenUser}
              label="Recipient"
              onChange={(e) => setChosenUser(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user.username}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Message"
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Send message to ${chosenUser || 'selected recipient'}`}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </StyledPaper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error || success}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default SendMail;