import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/global/darkModeSlice';

import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';

import {
  Logout,
  DarkModeOutlined,
  Brightness4Outlined,
} from '@mui/icons-material';
import { logout } from '../features/auth/authSlice';

export default function AccountMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.darkMode);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography variant='h6' sx={{ minWidth: 100 }}>
          {user.email}
        </Typography>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{ bgcolor: '#9c27b0' }}
              alt={user.fullName.toUpperCase()}
              src='/'
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: 150,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              py: 0,
            },
            '& .MuiList-root': {
              py: 0,
            },
            '& .MuiMenuItem-root': {
              py: 1.5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to='/profile'>
          <MenuItem sx={{ borderBottom: '1px solid #ddd' }}>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={() => dispatch(toggleDarkMode())}>
          <ListItemIcon>
            {!darkMode ? (
              <DarkModeOutlined fontSize='small' />
            ) : (
              <Brightness4Outlined fontSize='small' />
            )}
          </ListItemIcon>
          {!darkMode ? 'Dark Mode' : 'Light Mode'}
        </MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
