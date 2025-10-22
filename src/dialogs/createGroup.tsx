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
import { GROUP_TYPES } from '../common/constants.tsx';
import { GroupService } from '../services/groupService.ts';
import { CreateGroupRequest, GroupMember } from '../common/models.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '../store/actions/groupActions.ts';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroup = ({open, handleClose}) => {
  const groupService = new GroupService();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.currentUser);

  const [groupName, setGroupName] = React.useState<string | null>(null);
  const [type, setType] = React.useState<string>('Trip');
  const [loading, setLoading] = React.useState(false);
  const [members, setMembers] = React.useState<GroupMember[]>([]);
  const [memberName, setMemberName] = React.useState('');
  const [memberEmail, setMemberEmail] = React.useState('');

  const chipData = GROUP_TYPES;

  const onValueChange = (field: string, value: string) => {
    switch(field.toLowerCase()) {
      case 'name': setGroupName(value); break;
      case 'type': setType(value); break;
      default: break;
    }
  };

  const addMember = () => {
    if (!memberName || !memberEmail) {
      alert('Please enter both name and email');
      return;
    }

    // Check if email already exists
    if (members.some(m => m.email === memberEmail)) {
      alert('Member already added');
      return;
    }

    const newMember: GroupMember = {
      userId: Date.now(), // Temporary ID
      userName: memberName,
      email: memberEmail,
      role: 'member'
    };

    setMembers([...members, newMember]);
    setMemberName('');
    setMemberEmail('');
  };

  const removeMember = (userId: number) => {
    setMembers(members.filter(m => m.userId !== userId));
  };

  const createGroup = async () => {
    if(!groupName || groupName.length === 0) {
      alert("Please enter group name."); 
      return;
    }

    if (!currentUser?.id) {
      alert("User not logged in");
      return;
    }

    setLoading(true);

    // Add current user as admin
    const groupMembers: GroupMember[] = [
      {
        userId: parseInt(currentUser.id),
        userName: currentUser.name,
        email: currentUser.email,
        role: 'admin'
      },
      ...members
    ];

    const payload: CreateGroupRequest = {
      group_name: groupName,
      user_id_list: members.map(m => m.userId),
      group_type: type,
      user_id: parseInt(currentUser.id),
      description: groupName
    }

    try {
      const response = await groupService.createGroup(payload, groupMembers);
      
      // Add the new group to the list
      dispatch(addGroup(response));
      
      // Reset form and close
      handleClose();
      setGroupName(null);
      setType('Trip');
      setMembers([]);
      setMemberName('');
      setMemberEmail('');
    } catch (error: any) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <Button autoFocus color="inherit" onClick={createGroup} disabled={loading}>
              {loading ? 'Creating...' : 'done'}
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
          <Stack direction="row" spacing={2} style={styles.textInput}>
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
          <Typography style={styles.input}>Type</Typography>
          <Stack direction="row" spacing={2} style={styles.input}>
          {chipData.map((data, index) => {
            return (
              <ListItem key={index} style={{margin: '0px'}}>
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

          {/* Members Section */}
          <Typography style={{...styles.input, marginTop: '20px'}}>Add Members</Typography>
          <Stack direction="row" spacing={1} style={{...styles.input, alignItems: 'center'}}>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              style={{width: '150px'}}
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              style={{width: '200px'}}
            />
            <IconButton color="primary" onClick={addMember}>
              <AddIcon />
            </IconButton>
          </Stack>

          {/* Display added members */}
          {members.length > 0 && (
            <>
              <Typography style={{...styles.input, marginTop: '10px', fontSize: '0.9em'}}>
                Members ({members.length})
              </Typography>
              <Stack direction="row" spacing={1} style={{...styles.input, flexWrap: 'wrap', gap: '8px'}}>
                {members.map((member) => (
                  <Chip
                    key={member.userId}
                    icon={<PersonIcon />}
                    label={`${member.userName} (${member.email})`}
                    onDelete={() => removeMember(member.userId)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </>
          )}
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
    padding: '0px 0px'
  },

  textInput: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '20px',
    padding: '0px 0px'
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
    padding: '5px',
    margin: '0px'
  }
}

export default CreateGroup;