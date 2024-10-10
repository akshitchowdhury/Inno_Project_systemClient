import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Box
} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import i1 from "../assets/aboutBg2.jpg";
import i2 from "../assets/homeBgif.gif";
import logo from "../assets/innoLogo2.jpeg";

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: '100%',
}));

const Home = () => {
  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/users", {
        method: "GET"
      });
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const groupedUsers = userList.reduce((acc, user) => {
    if (!acc[user.isPresent]) {
      acc[user.isPresent] = [];
    }
    acc[user.isPresent].push(user.username);
    return acc;
  }, {});

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="Innomatrics Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar> */}

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={i1}
                alt="About Background"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Welcome Admin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your innovative solutions and cutting-edge technologies from this centralized admin dashboard. 
                  Monitor performance, analyze data, and make informed decisions to drive your business forward.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={i2}
                alt="Home Background"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Quick Actions
                </Typography>
                <StyledButton
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/taskManage"
                >
                  Daily Task Analytics
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/projectList"
                >
                  Manage Projects
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="success"
                  component={Link}
                  to="/userlist"
                >
                  User Management
                </StyledButton>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Quick Updates
                </Typography>
                <List>
                  {groupedUsers["Leave"] && groupedUsers["Leave"].length > 0 && (
                    <>
                      <ListItem>
                        <ListItemText
                          primary="Employees on Leave"
                          secondary={groupedUsers["Leave"].join(", ")}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  )}
                  {groupedUsers["WFO"] && groupedUsers["WFO"].length > 0 && (
                    <>
                      <ListItem>
                        <ListItemText
                          primary="Employees Working from Office"
                          secondary={groupedUsers["WFO"].join(", ")}
                        />
                      </ListItem>
                      <Divider />
                    </>
                  )}
                  {groupedUsers["WFH"] && groupedUsers["WFH"].length > 0 && (
                    <ListItem>
                      <ListItemText
                        primary="Employees Working from Home"
                        secondary={groupedUsers["WFH"].join(", ")}
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 Random Technologies. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;