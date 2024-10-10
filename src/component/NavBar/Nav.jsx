import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#000000',
}));

const StyledToolbar = styled(Toolbar)({
  height: 100,
  display: 'flex',
  justifyContent: 'space-between',
});

const DesktopMenu = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mailMenuAnchor, setMailMenuAnchor] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMailMenuOpen = (event) => {
    setMailMenuAnchor(event.currentTarget);
  };

  const handleMailMenuClose = () => {
    setMailMenuAnchor(null);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'User List', path: '/userlist' },
    { text: 'Task Manager', path: '/taskManage' },
    { text: 'Attendance', path: '/attendanceTracker' },
    { text: 'Project List', path: '/projectList' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleMailMenuOpen}>
          <ListItemText primary="Mail" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Admin Dashboard
        </Typography>
        <DesktopMenu>
          {menuItems.map((item) => (
            <Button key={item.text} color="inherit" component={Link} to={item.path}>
              {item.text}
            </Button>
          ))}
          <Button
            color="inherit"
            onClick={handleMailMenuOpen}
            aria-controls="mail-menu"
            aria-haspopup="true"
          >
            Mail
          </Button>
        </DesktopMenu>
        <MobileMenuButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </MobileMenuButton>
      </StyledToolbar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
      <Menu
        id="mail-menu"
        anchorEl={mailMenuAnchor}
        keepMounted
        open={Boolean(mailMenuAnchor)}
        onClose={handleMailMenuClose}
      >
        <MenuItem component={Link} to="/receiveMail" onClick={handleMailMenuClose}>
          Check Mail
        </MenuItem>
        <MenuItem component={Link} to="/sendMail" onClick={handleMailMenuClose}>
          Send Mail
        </MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export default Nav;