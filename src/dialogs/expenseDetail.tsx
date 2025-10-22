import * as React from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Paper,
  Chip
} from '@mui/material';
import { SlideProps } from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Transition = React.forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ExpenseDetailProps {
  open: boolean;
  handleClose: () => void;
  expense: any;
}

export default function ExpenseDetail({ open, handleClose, expense }: ExpenseDetailProps) {
  const currentGroup = useSelector((state: RootState) => state.groups.currentGroup);

  if (!expense) {
    return null;
  }

  const getSplitMethodLabel = (method: string) => {
    return method || 'Equally';
  };

  // Helper function to get member name by userId
  const getMemberName = (userId: number, fallbackName?: string) => {
    if (fallbackName && fallbackName.trim()) {
      return fallbackName;
    }
    const member = currentGroup?.members?.find(m => m.userId === userId);
    return member?.userName || 'Unknown User';
  };

  return (
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
            Expense Details
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Expense Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#1172ce', mr: 2 }}>
              <ReceiptLongIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" component="div">
                {expense.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {expense.category || 'General'}
              </Typography>
            </Box>
            <Typography variant="h4" color="primary">
              ₹{expense.amount?.toFixed(2)}
            </Typography>
          </Box>

          {/* Paid By */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
            <PaymentIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary">
              Paid by:
            </Typography>
            <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
              {getMemberName(expense.paidBy, expense.paidByName)}
            </Typography>
          </Box>

          {/* Split Method */}
          <Box sx={{ mt: 2 }}>
            <Chip 
              label={`Split ${getSplitMethodLabel(expense.splitMethod)}`} 
              color="primary" 
              variant="outlined"
            />
          </Box>

          {/* Date and Time */}
          {expense.date && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Date: {new Date(expense.date).toLocaleDateString()} at {new Date(expense.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          )}
        </Paper>

        {/* Split Details */}
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Split Details
          </Typography>
          
          {expense.splitDetails && expense.splitDetails.length > 0 ? (
            <List>
              {expense.splitDetails.map((split: any, index: number) => (
                <React.Fragment key={split.userId}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: split.isPaid ? '#4caf50' : '#ff9800' }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={getMemberName(split.userId, split.userName)}
                      secondary={
                        <Box>
                          <Typography component="span" variant="body2" color="text.primary">
                            ₹{(split.amount !== undefined && split.amount !== null) ? Number(split.amount).toFixed(2) : '0.00'}
                          </Typography>
                          {split.percentage !== undefined && split.percentage !== null && (
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({Number(split.percentage).toFixed(1)}%)
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <Chip 
                      label={split.isPaid ? "Paid" : "Pending"} 
                      color={split.isPaid ? "success" : "warning"}
                      size="small"
                    />
                  </ListItem>
                  {index < expense.splitDetails.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No split details available
            </Typography>
          )}
        </Paper>
      </Box>
    </Dialog>
  );
}

