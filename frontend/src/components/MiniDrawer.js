import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Icons
import {
  Dashboard,
  BarChart,
  ImportExport,
  Person,
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Menu,
} from '@mui/icons-material';

import { Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AccountMenu from './AccountMenu';

const drawerLinks = [
  { id: 0, text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { id: 1, text: 'Statisitcs', icon: <BarChart />, path: '/statistics' },
  {
    id: 2,
    text: 'Transactions',
    icon: <ImportExport />,
    path: '/transactions',
  },
  { id: 3, text: 'Profile', icon: <Person />, path: '/profile' },
  { id: 4, text: 'Current Month', icon: <CalendarMonth />, path: '/dunno' },
  { id: 5, text: 'Last Quarter', icon: <CalendarMonth />, path: '/dunno' },
  { id: 6, text: 'Year-end', icon: <CalendarMonth />, path: '/dunno' },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              flex: '1',
              alignItems: 'center',
            }}
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography variant='h6'>Transaction Tracker App</Typography>
          </Box>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ p: 0 }}>
          {drawerLinks.map((link) => (
            <NavLink to={link.path} key={link.id}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 55,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    py: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.7rem',
                      },
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={link.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        fontSize: '1.1rem',
                        fontWeight: 400,
                      },
                    }}
                  />
                </ListItemButton>
                {link.text === 'Profile' && <Divider />}
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </>
  );
}
