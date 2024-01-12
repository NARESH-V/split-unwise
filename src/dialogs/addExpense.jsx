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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Container } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddExpense(props) {

  const [amount, setAmount] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [splitWith, setSplitWith] = React.useState(null);

  const friends = [{name: 'Naresh', email: 'xyz@gmail.com', userId: 1},
    {name: 'karthi', email: 'kar@gmail.com', userId: 2},
    {name: 'balaji', email: 'bal@gmail.com', userId: 3},
    {name: 'Vasanth', email: 'vash@gmail.com', userId: 4}
  ];

  const groups = [
    {groupId: 123, name: 'group1'},
    {groupId: 234, name: 'group2'}
  ]

  const options = [...friends, ...groups].map(option => {
    return {
      category: !!option.groupId ? 'Groups' : 'Friends',
      label: option.name,
      value: option
    }
  });

  const onValueChange = (field, value) => {
    switch(field.toLowerCase()) {
      case 'splitWith': setSplitWith(value); break;
      case 'amount': setAmount(parseFloat(value)); break;
      case 'description': setDescription(value); break;
      default: break;
    }
  };

  const addExpense = () => {
    const errorMsgs =[];
    if(!description || !description.length > 0) {
      errorMsgs.push("please enter a valid description."); 
    } 
    if(!amount || amount < 0 ) {
      errorMsgs.push("please enter a valid amount.");
    }
    if(errorMsgs.length > 0) {
      alert(errorMsgs.join("\n"));
      return;
    }

    alert(`Expense : ${description}, amount :${amount}`);

    props.handleClose();
    setAmount(null);
    setDescription(null);
    setSplitWith(null);
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Expense
            </Typography>
            <Button autoFocus color="inherit" onClick={addExpense}>
              done
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Stack direction="row" spacing={2} style={styles.partyInfo}>
            <Typography>With you and: </Typography>
            <Autocomplete
              id="grouped-demo"
              options={options}
              groupBy={(option) => option.category}
              getOptionLabel={(option) => option.label}
              sx={{ width: 300 }}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  placeholder='Enter names, emails, or Phone' 
                  style={styles.splitWith} 
                  variant='standard'
                  onChange={(e) => onValueChange("splitWith", e.target.value)} />
              }
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
            />
          </Stack>
        </Container>
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
              <ReceiptLongIcon />
            </Avatar>
            <TextField
              id="expense-description"
              placeholder="Enter a description"
              variant="standard"
              style={styles.textInput}
              onChange={(e) => onValueChange("description", e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2} style={styles.input}>
            <Avatar variant='rounded' style={styles.groupImage}>
              <CurrencyRupeeIcon />
            </Avatar>
            <TextField
              id="amount"
              placeholder="0.00"
              variant="standard"
              style={styles.textInput}
              onChange={(e) => onValueChange("amount", e.target.value)}
            />
          </Stack>
          
          <Stack direction="row" spacing={2}>
            <Typography>Paid by </Typography>
            <Typography>you </Typography>
            <Typography>and split</Typography>
            <Typography>equally</Typography>
          </Stack>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

const GroupHeader = styled('div')(() => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: '#1172ce',
  backgroundColor: '#c2e0ff'
}));

const GroupItems = styled('ul')({
  padding: 0,
});

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

  splitWith: {
 
  },

  textInput: {
    width: '80%'
  },

  groupImage: {
    alignSelf: 'center',
    height: '50px',
    width: '50px'
  },

  chip: {
    padding: '5px'
  },

  partyInfo: {
    alignItems: 'baseline',
    justifyContent: 'center',
    padding: '20px'
  }
}