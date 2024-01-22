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
import { GROUP_TYPES, SPLIT_METHOD } from '../common/constants.tsx';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import SwipeableViews from 'react-swipeable-views';
import EqualSplit from './tabs/equalSplit.tsx';
import UnEqualSplit from './tabs/unEqualSplit.tsx';
import PercentageSplit from './tabs/percentageSplit.tsx';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdjustSplit({open, handleClose}) {
  const [groupName, setGroupName] = React.useState<string | null>(null);
  const [type, setType] = React.useState<string | null>(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

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
              Adjust Split
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
          <EqualSplit/>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <UnEqualSplit/>
        </TabPanel>
        <TabPanel value={value} index={2} >
          <PercentageSplit/>
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