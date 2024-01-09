import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return(
    <AppBar>
        <Toolbar>
        <Typography variant="h6" component="div">
            Split Unwise
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
              component={Link}
              to={"/createGroup"}
            >
              <GroupAddIcon />
            </IconButton>
          </Box>
        </Toolbar>
    </AppBar>
        
  );
};

export default MenuBar;