import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

const drawerWidth = 240;

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

    const pagePathMap = [
        {page: 'Groups', path: '/', icon: <GroupIcon/> }, 
        {page: 'GroupExpense', path: 'groupExpense', icon: <PaymentsIcon/> },
        {page: 'Activity', path: '/activity', icon: <TimelineIcon/> }, 
    ];

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
            {pagePathMap.map((nav, index) => (
                <ListItem key={index} disablePadding component={Link} to={nav.path} onClick={handleDrawerToggle}>
                <ListItemButton>
                    <ListItemIcon>
                    {nav.icon}
                    </ListItemIcon>
                    <ListItemText primary={nav.page} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </div>
    );
    
  return(
    <Container sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}
        >
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                Split Unwise
                </Typography>
            </Toolbar>
        </AppBar>
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    </Container>
  );
};

export default NavBar;