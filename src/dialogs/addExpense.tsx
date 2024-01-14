import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Container } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import { GROUP_FRIENDS_OPTIONS, SPLIT_METHOD } from '../common/constants.tsx';
import { Group } from '../common/models.ts';
import AdjustSplit from './adjustSplit.tsx';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddExpense(props) {

  const [amount, setAmount] = React.useState<number | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [splitWith, setSplitWith] = React.useState<Group | null>(null);
  const [splitMethod, setSplitMethod] = React.useState<string>(SPLIT_METHOD.EQUALLY);
  const [open, setOpen] = React.useState(false);

  const options = GROUP_FRIENDS_OPTIONS;

  const onValueChange = (field: string, value: any) => {
    switch(field.toLowerCase()) {
      case 'splitwith': setSplitWith(value); break;
      case 'amount': setAmount(parseFloat(value)); break;
      case 'description': setDescription(value); break;
      default: break;
    }
  };

  const handleSplitMethodChange = (splitMethod: string) => {
    setSplitMethod(splitMethod);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  const addExpense = () => {
    const errorMsgs: string[] =[];
    if(!description || description.length < 0) {
      errorMsgs.push("please enter a valid description."); 
    } 
    if(!amount || amount < 0 ) {
      errorMsgs.push("please enter a valid amount.");
    }
    if(errorMsgs.length > 0) {
      alert(errorMsgs.join("\n"));
      return;
    }

    alert(`Expense : ${description}, amount :${amount}, SplitWith: ${splitWith?.name}`);

    props.handleClose();
    setAmount(null);
    setDescription(null);
    setSplitWith(null);
    setSplitMethod(SPLIT_METHOD.EQUALLY);
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
              onChange={(e, option) => onValueChange("splitWith", option?.value)} 
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  placeholder='Enter names, emails, or Phone' 
                  style={styles.splitWith} 
                  variant='standard'
                  className='autocomplete'/>
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
            <Button onClick={handleClickOpen}>{splitMethod}</Button>
          </Stack>
        </Box>
      </Dialog>
      <AdjustSplit open={open} handleClose={handleClose}/>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  }
}