import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Box, Stack, Avatar, TextField, ListItem, Chip } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import createGroup from '../dialogs/createGroup';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserRegistration = ({open, handleClose}) => {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              User Registration
            </Typography>
            <Button autoFocus color="inherit">
              register
            </Button>
          </Toolbar>
        </AppBar>
       <div> register !</div>
      </Dialog>
    </React.Fragment>
  );
};

export default UserRegistration;