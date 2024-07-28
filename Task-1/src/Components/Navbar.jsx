import React, { useState } from 'react';
import { AppBar, Button, IconButton, Stack, Toolbar, Typography, Menu, MenuItem, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#20c9b8',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static' color='transparent' elevation={0}>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <PentagonIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} className=''>
            Tasks
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='end'
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor='right'
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <List>
                  <ListItem button component={Link} to="/aggrid" onClick={handleDrawerToggle}>
                    <ListItemText primary='AgGrid' />
                  </ListItem>
                  <ListItem button component={Link} to="/treeview" onClick={handleDrawerToggle}>
                    <ListItemText primary='TreeView' />
                  </ListItem>
                  {/* <ListItem button component={Link} to="/importdata" onClick={handleDrawerToggle}>
                    <ListItemText primary='ImportData' />
                  </ListItem>
                  <ListItem button component={Link} to="/exportdata" onClick={handleDrawerToggle}>
                    <ListItemText primary='ExportData' />
                  </ListItem>
                  <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
                    <ListItemText primary='Login' />
                  </ListItem> */}
                </List>
              </Drawer>
            </>
          ) : (
            <Stack direction='row' spacing={2} className='bg-gradient-to-r from-yellow-50 to-red-400 rounded-md'>
              <Button color='inherit' component={Link} to="/aggrid" className=''>AgGrid</Button>
              <Button color='inherit' component={Link} to="/treeview">TreeView</Button>
              <Button
                color='inherit'
                id='resources-button'
                aria-controls={open ? 'resources-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
              >
                Import/Export
              </Button>
              <Button color='inherit' component={Link} to="/login">Login</Button>
            </Stack>
          )}
          <Menu
            id='resources-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            MenuListProps={{
              'aria-labelledby': 'resources-button',
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/importdata">ImportData</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/exportdata">ExportData</MenuItem>
          </Menu>
        </Toolbar>
        <Outlet />
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
