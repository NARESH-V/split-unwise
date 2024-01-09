import React, { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

const navHeight = 60;

const NavBar = () => {
    const pagePathMap = [
        {page: 'Groups', path: '/', icon: <GroupIcon/> }, 
        {page: 'GroupExpense', path: 'groupExpense', icon: <PaymentsIcon/> },
        {page: 'Activity', path: '/activity', icon: <TimelineIcon/> }, 
    ];
    const [active, setActive] = useState('Groups'); 
    const handleClick = (page) => {
      setActive(page);
    }
  return(
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: navHeight, zIndex: 1 }} elevation={3}>
        <BottomNavigation
          showLabels
        >
            {pagePathMap.map((nav, index) => (
          <BottomNavigationAction 
            label={nav.page} 
            icon={nav.icon} 
            component={Link} 
            to={nav.path} 
            key={index} 
            onClick={() => handleClick(nav.page)}
            style={{color: `${active === nav.page ? "#1172ce" :""}`}}/>
            ))}
        </BottomNavigation>
      </Paper>
  );
};

export default NavBar;