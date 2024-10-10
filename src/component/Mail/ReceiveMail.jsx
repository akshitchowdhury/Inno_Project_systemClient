import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Reply as ReplyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ReceiveMail() {
  const [mails, setMails] = useState([]);
  const [users, setUsers] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [reply, setReply] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchEmail = async () => {
    try {
      const response = await fetch('/messages/getMessages', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch emails');
      const data = await response.json();
      setMails(data);
    } catch (error) {
      console.error('Error fetching emails:', error);
      showSnackbar('Error fetching emails');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/users', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showSnackbar('Error fetching users');
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch('/messages/deleteAll', { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete emails');
      setMails([]);
      showSnackbar('All messages deleted successfully');
    } catch (error) {
      console.error('Error deleting emails:', error);
      showSnackbar('Error deleting emails');
    }
    setDeleteDialogOpen(false);
  };

  const handleReply = async (mail, empUsername) => {
    if (reply.trim() === '') return;
    const replyData = {
      sender_email: 'parameshp@innotech.co',
      receiver_username: empUsername,
      messages: [reply],
    };
    try {
      const response = await fetch('/messages/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData),
      });
      if (!response.ok) throw new Error('Failed to reply');
      showSnackbar('Message sent successfully');
      setReply('');
      setExpandedRow(null);
    } catch (error) {
      console.error('Error replying:', error);
      showSnackbar('Error sending reply');
    }
  };

  const handleDeleteOne = async (id) => {
    try {
      const response = await fetch(`/messages/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete email');
      setMails((prevMails) => prevMails.filter((mail) => mail._id !== id));
      showSnackbar('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting email:', error);
      showSnackbar('Error deleting email');
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    fetchEmail();
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', p: 3 }}>
      <Typography variant="h4" gutterBottom component="div">
        Inbox
      </Typography>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => setDeleteDialogOpen(true)}
        sx={{ mb: 2 }}
      >
        Delete All Messages
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="inbox table">
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Received at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mails.map((mail, index) => {
              const verifiedUser = users.find((user) => user.email === mail.sender_email);
              return (
                <React.Fragment key={mail._id}>
                  <StyledTableRow>
                    <TableCell component="th" scope="row">
                      {mail.sender_email}
                    </TableCell>
                    <TableCell>{mail.messages.length > 0 ? mail.messages[0] : "No message"}</TableCell>
                    <TableCell>{formatDate(mail.createdAt)}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                      >
                        {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDeleteOne(mail._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                      <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Reply
                          </Typography>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Enter your reply here"
                            variant="outlined"
                            sx={{ mb: 2 }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ReplyIcon />}
                            onClick={() => handleReply(mail, verifiedUser?.username)}
                          >
                            Send Reply
                          </Button>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {mails.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No new mails
        </Typography>
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete all messages?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all messages? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteAll} color="error" autoFocus>
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
