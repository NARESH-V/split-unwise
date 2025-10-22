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
import { SPLIT_METHOD } from '../common/constants.tsx';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import SwipeableViews from 'react-swipeable-views';
import EqualSplit from './tabs/equalSplit.tsx';
import UnEqualSplit from './tabs/unEqualSplit.tsx';
import PercentageSplit from './tabs/percentageSplit.tsx';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AdjustSplitProps {
  open: boolean;
  handleClose: () => void;
  amount?: number;
  participants?: Array<{ userId: number; userName: string; email: string }>;
  splitMethod?: string;
  onSplitMethodChange?: (method: string) => void;
  onSplitUpdate?: (splitDetails: any, participants?: any[]) => void;
}

export default function AdjustSplit({
  open, 
  handleClose, 
  amount = 0, 
  participants = [],
  splitMethod = SPLIT_METHOD.EQUALLY,
  onSplitMethodChange,
  onSplitUpdate
}: AdjustSplitProps) {
  const [value, setValue] = React.useState(0);
  const [currentSplitDetails, setCurrentSplitDetails] = React.useState<any>(null);
  const [selectedParticipants, setSelectedParticipants] = React.useState<any[]>(participants);

  // Debug log when amount changes
  React.useEffect(() => {
    console.log('AdjustSplit received amount:', amount);
  }, [amount]);

  // Set initial tab based on split method
  React.useEffect(() => {
    if (splitMethod === SPLIT_METHOD.EQUALLY) {
      setValue(0);
    } else if (splitMethod === SPLIT_METHOD.UNEQUALLY) {
      setValue(1);
    } else if (splitMethod === SPLIT_METHOD.BY_PERCENTAGE) {
      setValue(2);
    }
  }, [splitMethod, open]);

  // Sync selected participants with participants prop
  React.useEffect(() => {
    setSelectedParticipants(participants);
  }, [participants]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
    // Update split method when tab changes
    if (onSplitMethodChange) {
      if (newValue === 0) {
        onSplitMethodChange(SPLIT_METHOD.EQUALLY);
      } else if (newValue === 1) {
        onSplitMethodChange(SPLIT_METHOD.UNEQUALLY);
      } else if (newValue === 2) {
        onSplitMethodChange(SPLIT_METHOD.BY_PERCENTAGE);
      }
    }
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
    
    // Update split method when swipe changes tab
    if (onSplitMethodChange) {
      if (index === 0) {
        onSplitMethodChange(SPLIT_METHOD.EQUALLY);
      } else if (index === 1) {
        onSplitMethodChange(SPLIT_METHOD.UNEQUALLY);
      } else if (index === 2) {
        onSplitMethodChange(SPLIT_METHOD.BY_PERCENTAGE);
      }
    }
  };

  const handleSplitDetailsChange = (splitDetails: any) => {
    setCurrentSplitDetails(splitDetails);
  };

  const handleParticipantSelectionChange = (newParticipants: any[]) => {
    setSelectedParticipants(newParticipants);
  };

  const handleDone = () => {
    // Save split configuration
    if (onSplitUpdate) {
      if (currentSplitDetails && currentSplitDetails.length > 0) {
        // Use custom split details with participant info
        const detailsWithNames = currentSplitDetails.map((split: any) => {
          const participant = selectedParticipants.find(p => p.userId === split.userId);
          return {
            ...split,
            userName: split.userName || participant?.userName || '',
            amount: Number(split.amount) || 0
          };
        });
        console.log('Saving custom split details:', detailsWithNames);
        onSplitUpdate(detailsWithNames, selectedParticipants);
      } else if (value === 0) {
        // For equal split, calculate and send the details
        const splitAmount = selectedParticipants.length > 0 ? Number((amount / selectedParticipants.length).toFixed(2)) : 0;
        const equalSplitDetails = selectedParticipants.map(p => ({
          userId: p.userId,
          userName: p.userName || '',
          amount: splitAmount
        }));
        console.log('Saving equal split details:', equalSplitDetails, 'Total amount:', amount);
        onSplitUpdate(equalSplitDetails, selectedParticipants);
      } else {
        // Just update participants
        onSplitUpdate(null, selectedParticipants);
      }
    }
    handleClose();
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
              Adjust Split
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDone}>
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
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          sx={styles.tabGroup}
        >
          <Tab label={SPLIT_METHOD.EQUALLY} {...a11yProps(0)} />
          <Tab label={SPLIT_METHOD.UNEQUALLY} {...a11yProps(1)} />
          <Tab label={SPLIT_METHOD.BY_PERCENTAGE} {...a11yProps(2)} />
        </Tabs>
      <SwipeableViews
        axis={'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} >
          <EqualSplit 
            amount={amount} 
            participants={selectedParticipants}
            allParticipants={participants}
            onParticipantChange={handleParticipantSelectionChange}
          />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <UnEqualSplit amount={amount} participants={selectedParticipants} onSplitChange={handleSplitDetailsChange}/>
        </TabPanel>
        <TabPanel value={value} index={2} >
          <PercentageSplit amount={amount} participants={selectedParticipants} onSplitChange={handleSplitDetailsChange}/>
        </TabPanel>
      </SwipeableViews>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const styles = {
  form: {
    display: 'grid',
    padding: '3rem 1rem'
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
  },

  tabGroup: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-evenly'
    }
  }
}