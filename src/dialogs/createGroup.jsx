import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import GiteIcon from '@mui/icons-material/Gite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Chip from '@mui/material/Chip';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateGroup({open, handleClose}) {
  const [groupName, setGroupName] = React.useState(null);
  const [type, setType] = React.useState(null);

  const chipData = [
    {label: 'Trip', icon: <CardTravelIcon/>},
    {label: 'Home', icon: <GiteIcon/>},
    {label: 'Couple', icon: <FavoriteBorderIcon/>},

  ]

  const onValueChange = (field, value) => {
    switch(field.toLowerCase()) {
      case 'name': setGroupName(value); break;
      case 'type': setType(value); break;
      default: break;
    }
  };

  const createGroup = () => {
    if(!groupName || !groupName.length > 0) {
      alert("please enter group name."); 
      return;
    } 
    alert(`group name : ${groupName}, type :${type}`);

    handleClose();
    setGroupName(null);
    setType(null);
  }

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
              Create Group
            </Typography>
            <Button autoFocus color="inherit" onClick={createGroup}>
              done
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          style={styles.form}
        >
          <Stack direction="row" spacing={2} style={styles.input}>
            <Avatar variant='rounded' style={styles.groupImage}>
              <AddAPhotoIcon />
            </Avatar>
            <TextField
              id="group-name"
              label="Group Name"
              variant="standard"
              style={styles.groupName}
              onChange={(e) => onValueChange("name", e.target.value)}
            />
          </Stack>
          <Typography>Type</Typography>
          <Stack direction="row" spacing={2}>
          {chipData.map((data, index) => {
            return (
              <ListItem key={index}>
                <Chip
                  icon={data.icon}
                  label={data.label}
                  style={styles.chip}
                  onClick={() => onValueChange("type", data.label)}
                  color={data.label == type  ? 'primary' : undefined}
                />
              </ListItem>
            );
          })}
          </Stack>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

const styles = {
  form: {
    display: 'grid',
    justifyContent: 'center',
    padding: '3rem'
  },

  input: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '20px'
  },

  groupName: {
    width: '80%'
  },

  groupImage: {
    alignSelf: 'center',
    height: '50px',
    width: '50px'
  },

  chip: {
    padding: '5px'
  }
}