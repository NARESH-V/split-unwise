import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide, { SlideProps } from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Chip from '@mui/material/Chip';
import { GROUPS, GROUP_TYPES } from '../common/constants.tsx';
import { GroupService } from '../services/groupService.ts';
import { CreateGroupRequest } from '../common/models.ts';
import { connect, useDispatch } from 'react-redux';
import { addGroup, removeGroup, setGroupList } from '../store/actions/groupActions.ts';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroup = ({open, handleClose}) => {
  const groupService = new GroupService();
  const dispatch = useDispatch();

  const [groupName, setGroupName] = React.useState<string | null>(null);
  const [type, setType] = React.useState<string>('default');

  const chipData = GROUP_TYPES;

  const onValueChange = (field: string, value: string) => {
    switch(field.toLowerCase()) {
      case 'name': setGroupName(value); break;
      case 'type': setType(value); break;
      default: break;
    }
  };

  const createGroup = () => {
    if(!groupName || groupName.length < 0) {
      alert("please enter group name."); 
      return;
    } 

    const payload: CreateGroupRequest = {
      group_name: groupName,
      user_id_list: [],
      group_type: type,
      user_id: 2,
      description: groupName
    }
    groupService.createGroup(payload).then(response => {
      if(response?.status !== 202) {
        return;
      }
    }).catch((error: any) => {
      console.log(error);
      dispatch(setGroupList(GROUPS));
    })

    handleClose();
    setGroupName(null);
    setType('default');
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
                  color={data.label === type  ? 'primary' : undefined}
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

const mapStateToProps = (state) => ({
  groups: state.groups.groups,
});

const mapDispatchToProps = {
  addGroup,
  removeGroup,
  setGroupList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);