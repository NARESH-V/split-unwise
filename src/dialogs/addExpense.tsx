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
import CategoryIcon from '@mui/icons-material/Category';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MovieIcon from '@mui/icons-material/Movie';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FlightIcon from '@mui/icons-material/Flight';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Container, MenuItem, Menu, ListItemIcon, Tooltip } from '@mui/material';
import { SPLIT_METHOD } from '../common/constants.tsx';
import { GroupMember } from '../common/models.ts';
import AdjustSplit from './adjustSplit.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { GroupService } from '../services/groupService.ts';
import { addExpense as addExpenseAction } from '../store/actions/expenseActions.ts';

// Expense categories
const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Groceries',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Rent',
  'Healthcare',
  'Travel',
  'Education',
  'Sports & Fitness',
  'Bills & Services',
  'Gifts',
  'Other'
];

// Category to icon mapping
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: any } = {
    'Food & Dining': <RestaurantIcon />,
    'Groceries': <LocalGroceryStoreIcon />,
    'Transportation': <DirectionsCarIcon />,
    'Entertainment': <MovieIcon />,
    'Shopping': <ShoppingBagIcon />,
    'Utilities': <ElectricBoltIcon />,
    'Rent': <HomeIcon />,
    'Healthcare': <LocalHospitalIcon />,
    'Travel': <FlightIcon />,
    'Education': <SchoolIcon />,
    'Sports & Fitness': <FitnessCenterIcon />,
    'Bills & Services': <ReceiptIcon />,
    'Gifts': <CardGiftcardIcon />,
    'Other': <MoreHorizIcon />
  };
  return iconMap[category] || <CategoryIcon />;
};

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddExpense(props) {
  const groupService = new GroupService();
  const dispatch = useDispatch();
  const currentGroup = useSelector((state: RootState) => state.groups.currentGroup);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [amount, setAmount] = React.useState<number | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState<string>('Other');
  const [selectedMembers, setSelectedMembers] = React.useState<GroupMember[]>([]);
  const [paidBy, setPaidBy] = React.useState<GroupMember | null>(null);
  const [splitMethod, setSplitMethod] = React.useState<string>(SPLIT_METHOD.EQUALLY);
  const [customSplitDetails, setCustomSplitDetails] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  // Menu anchors
  const [categoryAnchor, setCategoryAnchor] = React.useState<null | HTMLElement>(null);
  const [paidByAnchor, setPaidByAnchor] = React.useState<null | HTMLElement>(null);

  // Get members from current group, or empty array
  const groupMembers = currentGroup?.members || [];

  // Track if dialog is opening (transitioning from closed to open)
  const prevOpenRef = React.useRef(props.open);
  
  React.useEffect(() => {
    const isOpening = props.open && !prevOpenRef.current;
    prevOpenRef.current = props.open;
    
    if (isOpening && currentUser && groupMembers.length > 0) {
      // Initialize with all members selected when dialog opens
      setSelectedMembers(groupMembers);
      // Reset custom split details
      setCustomSplitDetails(null);
      
      // Set paid by to current user
      const currentUserMember = groupMembers.find(
        m => m.email === currentUser.email || m.userId === parseInt(currentUser.id || '0')
      );
      if (currentUserMember) {
        setPaidBy(currentUserMember);
      }
    }
  }, [props.open, currentUser, groupMembers]);

  const onValueChange = (field: string, value: any) => {
    switch(field.toLowerCase()) {
      case 'amount': 
        const parsedAmount = parseFloat(value);
        console.log('Amount changed:', value, 'Parsed to:', parsedAmount);
        setAmount(isNaN(parsedAmount) ? null : parsedAmount);
        break;
      case 'description': 
        setDescription(value); 
        break;
      default: break;
    }
  };

  const handleClickOpen = () => {
    // Validate amount is entered before opening split dialog
    console.log('Opening split dialog with amount:', amount);
    if (!amount || amount <= 0) {
      alert("Please enter an amount before adjusting the split.");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSplitMethodChange = (method: string) => {
    setSplitMethod(method);
  };

  const handleSplitUpdate = (splitDetails: any, participants?: GroupMember[]) => {
    console.log('Received split details in addExpense:', splitDetails);
    console.log('Received participants in addExpense:', participants);
    setCustomSplitDetails(splitDetails);
    if (participants) {
      setSelectedMembers(participants);
    }
  };
  
  const addExpense = async () => {
    const errorMsgs: string[] = [];
    
    if(!description || description.length === 0) {
      errorMsgs.push("Please enter a valid description."); 
    } 
    if(!amount || amount <= 0) {
      errorMsgs.push("Please enter a valid amount.");
    }
    if(!paidBy) {
      errorMsgs.push("Please select who paid for this expense.");
    }
    if(!currentGroup) {
      errorMsgs.push("No group selected.");
    }

    if(errorMsgs.length > 0) {
      alert(errorMsgs.join("\n"));
      return;
    }

    setLoading(true);

    try {
      // Calculate split details based on method and custom splits
      let splitDetails;
      
      if (customSplitDetails && customSplitDetails.length > 0) {
        // Use custom split details from AdjustSplit dialog
        splitDetails = customSplitDetails.map((split: any) => {
          // Ensure userName is set by looking it up if not present
          const member = selectedMembers.find(m => m.userId === split.userId);
          const detail: any = {
            userId: split.userId,
            userName: split.userName || member?.userName || '',
            amount: Number(split.amount) || 0,
            isPaid: false
          };
          // Only include percentage if it's defined (for percentage split)
          if (split.percentage !== undefined && split.percentage !== null) {
            detail.percentage = Number(split.percentage);
          }
          return detail;
        });
      } else {
        // Default to equal split with selected members
        if (selectedMembers.length === 0) {
          alert("Please select at least one member to split with.");
          setLoading(false);
          return;
        }
        
        splitDetails = selectedMembers.map(member => ({
          userId: member.userId,
          userName: member.userName || '',
          amount: Number((amount! / selectedMembers.length).toFixed(2)),
          isPaid: false
        }));
      }

      // Validate that there's at least one participant
      if(splitDetails.length === 0) {
        alert("Please select at least one member to split with.");
        setLoading(false);
        return;
      }

      console.log('Split details being saved:', splitDetails);

      const expensePayload = {
        groupId: currentGroup!.groupId,
        description: description!,
        amount: amount!,
        paidBy: paidBy!.userId,
        paidByName: paidBy!.userName,
        splitMethod: splitMethod,
        splitDetails: splitDetails,
        category: category,
        date: new Date().toISOString()
      };

      const newExpense = await groupService.addExpense(expensePayload);
      
      // Add expense to Redux state
      dispatch(addExpenseAction(newExpense));
      
      alert('Expense added successfully!');
      
      // Reset form and close
      props.handleClose();
      setAmount(null);
      setDescription(null);
      setCategory('Other');
      setSelectedMembers([]);
      setPaidBy(null);
      setSplitMethod(SPLIT_METHOD.EQUALLY);
      setCustomSplitDetails(null);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <Button autoFocus color="inherit" onClick={addExpense} disabled={loading}>
              {loading ? 'Saving...' : 'done'}
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
            <Tooltip title={`Category: ${category}`}>
              <Avatar 
                variant='rounded' 
                style={{...styles.groupImage, cursor: 'pointer'}}
                onClick={(e) => setCategoryAnchor(e.currentTarget)}
              >
                {getCategoryIcon(category)}
              </Avatar>
            </Tooltip>
            <TextField
              id="expense-description"
              placeholder="Enter a description"
              variant="standard"
              style={styles.textInput}
              value={description || ''}
              onChange={(e) => onValueChange("description", e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2} style={styles.input}>
            <Avatar variant='rounded' style={styles.groupImage}>
              <CurrencyRupeeIcon />
            </Avatar>
            <TextField
              id="amount"
              type="number"
              placeholder="0.00"
              variant="standard"
              style={styles.textInput}
              value={amount || ''}
              onChange={(e) => onValueChange("amount", e.target.value)}
              inputProps={{
                step: "0.01",
                min: "0"
              }}
            />
          </Stack>
          <Menu
            anchorEl={categoryAnchor}
            open={Boolean(categoryAnchor)}
            onClose={() => setCategoryAnchor(null)}
            PaperProps={{
              style: {
                maxHeight: 400,
                width: '220px'
              }
            }}
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <MenuItem 
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setCategoryAnchor(null);
                }}
                selected={category === cat}
              >
                <ListItemIcon>
                  {getCategoryIcon(cat)}
                </ListItemIcon>
                {cat}
              </MenuItem>
            ))}
          </Menu>

          <Stack direction="row" spacing={2} style={styles.splitMethodInfo}>
            <div>
              Paid by 
              <Button 
                style={styles.textButton} 
                onClick={(e) => setPaidByAnchor(e.currentTarget)} 
                variant='outlined'
              >
                {paidBy ? paidBy.userName : 'Select'}
              </Button>
            </div>
          </Stack>
          <Menu
            anchorEl={paidByAnchor}
            open={Boolean(paidByAnchor)}
            onClose={() => setPaidByAnchor(null)}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: '200px'
              }
            }}
          >
            {groupMembers.map((member) => (
              <MenuItem 
                key={member.userId}
                onClick={() => {
                  setPaidBy(member);
                  setPaidByAnchor(null);
                }}
                selected={paidBy?.userId === member.userId}
              >
                <ListItemIcon>
                  <Avatar style={{
                    width: 24,
                    height: 24,
                    fontSize: '0.8rem',
                    backgroundColor: member.role === 'admin' ? '#1172ce' : '#4caf50'
                  }}>
                    {member.userName.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                {member.userName}
              </MenuItem>
            ))}
          </Menu>

          <Stack direction="row" spacing={2} style={styles.splitMethodInfo}>
            <div>Split 
              <Button style={styles.textButton} onClick={handleClickOpen} variant='outlined'>{splitMethod}</Button>
            </div>
          </Stack>
        </Box>
      </Dialog>
      <AdjustSplit 
        open={open} 
        handleClose={handleClose}
        amount={amount || 0}
        participants={selectedMembers}
        splitMethod={splitMethod}
        onSplitMethodChange={handleSplitMethodChange}
        onSplitUpdate={handleSplitUpdate}
      />
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

  splitWith: {
    '& .MuiAutocomplete-inputRoot' : {
      padding: '0px !important'
    }
  },

  splitMethodInfo:{
    justifyContent: 'center'
  },

  textButton: {
    padding: '0px 5px',
    margin: '0px 5px',
    minWidth: 'unset'
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