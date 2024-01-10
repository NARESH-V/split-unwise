import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CreateGroup from '../dialogs/createGroup';

const MenuBar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <>
    <AppBar>
        <Toolbar>
        <Typography variant="h6" component="div">
            Split Unwise
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display:'flex' }}> 
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClickOpen}
            >
              <GroupAddIcon />
            </IconButton>
          </Box>
        </Toolbar>
    </AppBar>
    <CreateGroup open={open} handleClose={handleClose}/>
    </>
        
  );
};

export default MenuBar;