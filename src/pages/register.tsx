import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, TextField, Box, Container, Avatar, Stack } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UserRegistrationProps {
  open: boolean;
  handleClose: () => void;
  userData?: any;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({open, handleClose, userData}) => {
  const [name, setName] = React.useState(userData?.name || '');
  const [email, setEmail] = React.useState(userData?.email || '');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (!name || !email) {
      alert('Please enter name and email');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to register user
      // const userService = new UserService();
      // await userService.registerUser({ name, email, phone });
      
      alert('Registration successful! You can now log in.');
      handleClose();
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <Button 
              autoFocus 
              color="inherit" 
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Box style={formStyle}>
            <Stack direction="column" spacing={3} alignItems="center">
              <Avatar style={avatarStyle}>
                <PersonIcon style={{ fontSize: 60 }} />
              </Avatar>
              
              <Typography variant="h6">
                Complete Your Registration
              </Typography>

              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
              />

              <TextField
                label="Phone Number (Optional)"
                variant="outlined"
                fullWidth
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                By registering, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Dialog>
    </React.Fragment>
  );
};

const formStyle: React.CSSProperties = {
  marginTop: '40px',
  maxWidth: '500px',
  margin: '40px auto'
};

const avatarStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  backgroundColor: '#1172ce'
};

export default UserRegistration;