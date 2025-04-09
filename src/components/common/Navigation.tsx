import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useFirebase } from '../../hooks/useFirebase';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { user, logOut } = useFirebase();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
    handleClose();
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              fontWeight: 'bold',
              py: 2
            }}
          >
            CleanWaterCheck Finland
          </Typography>
          
          <Box sx={{ display: 'flex' }}>
            <Button
              component={Link}
              to="/about"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/data"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              Data
            </Button>
            <Button
              component={Link}
              to="/water-info"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              What's in the Water?
            </Button>
            <Button
              component={Link}
              to="/report"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              Report
            </Button>
            
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {user.role === 'admin' && (
                    <MenuItem onClick={() => navigate('/admin')}>Admin Panel</MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                component={Link}
                to="/auth"
                sx={{ color: 'white', display: 'block', mx: 1 }}
              >
                Login / Register
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation; 