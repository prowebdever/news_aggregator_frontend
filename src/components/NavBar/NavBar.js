import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Link, Menu, MenuItem, Box, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navbarBrand, navs } from '../../config/config';
import { isLoggedIn, setLoggedOut } from '../../utils/auth';
import HttpService from '../../services/httpService';

const NavBar = ({ loggedIn, setLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      const response = await HttpService.get('logout', '', true);
      if (response.status === 204) {
        setLoggedOut();
        setLoggedIn(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            {navbarBrand}
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          {loggedIn ? (
            <Button color="inherit" onClick={() => { handleMenuClose(); logout(); }}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={RouterLink} to="/">
              Home
            </MenuItem>
            {navs.map((nav) => loggedIn === nav.loggedIn && (
              <MenuItem
                key={nav.nav}
                onClick={handleMenuClose}
                component={RouterLink}
                to={nav.page}
              >
                {nav.nav}
              </MenuItem>
            ))}
            {loggedIn && (
              <MenuItem onClick={() => { handleMenuClose(); logout(); }}>
                Logout
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
