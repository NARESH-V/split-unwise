import React, { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Link, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddExpense from '../dialogs/addExpense.tsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';

const navHeight = 60;

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState('Groups'); 
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  React.useEffect(()=> {
    if(!currentUser) {
      navigate('/login');
    }
  }, [navigate, currentUser]);

  const pagePathMap = [
      {page: 'Groups', path: '/', icon: <GroupIcon/> }, 
      // {page: 'GroupExpense', path: 'groupExpense', icon: <PaymentsIcon/> },
      {page: 'Activity', path: '/activity', icon: <TimelineIcon/> }, 
      {page: 'Profile', path: '/profile', icon: <AccountCircleIcon/>}
  ];
   
  const handleClick = (page) => {
    setActive(page);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <>
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
      <Fab variant="extended" color="primary" style={fabStyle} onClick={handleClickOpen}>
        <ReceiptLongIcon sx={{ mr: 1 }} />
          Add Expense
      </Fab>
      <AddExpense open={open} handleClose={handleClose}/>
    </>
  );
};

const fabStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '75px',
  right: '25px',
}

export default NavBar;