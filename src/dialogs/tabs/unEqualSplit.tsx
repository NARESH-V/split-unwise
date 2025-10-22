import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Paper,
  TextField,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

interface UnEqualSplitProps {
  amount?: number;
  participants?: Array<{ userId: number; userName: string }>;
  onSplitChange?: (splits: Array<{ userId: number; amount: number }>) => void;
}

const UnEqualSplit: React.FC<UnEqualSplitProps> = ({ 
  amount = 0, 
  participants = [],
  onSplitChange 
}) => {
  const [splits, setSplits] = useState<{ [key: number]: number }>({});
  const [totalAllocated, setTotalAllocated] = useState(0);

  useEffect(() => {
    // Initialize splits with equal distribution
    const equalAmount = participants.length > 0 ? amount / participants.length : 0;
    const initialSplits: { [key: number]: number } = {};
    participants.forEach(p => {
      initialSplits[p.userId] = Number(equalAmount.toFixed(2));
    });
    setSplits(initialSplits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, participants.length]);

  useEffect(() => {
    const total = Object.values(splits).reduce((sum, val) => sum + val, 0);
    setTotalAllocated(total);
    
    if (onSplitChange && Object.keys(splits).length > 0) {
      const splitArray = Object.entries(splits).map(([userId, amount]) => {
        const participant = participants.find(p => p.userId === Number(userId));
        return {
          userId: Number(userId),
          userName: participant?.userName || '',
          amount
        };
      });
      onSplitChange(splitArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splits]);

  const handleAmountChange = (userId: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSplits(prev => ({ ...prev, [userId]: numValue }));
  };

  if (participants.length === 0) {
    return (
      <Paper style={emptyStyle}>
        <Typography variant="body1" color="textSecondary">
          No participants selected
        </Typography>
      </Paper>
    );
  }

  const remaining = amount - totalAllocated;
  const isBalanced = Math.abs(remaining) < 0.01;

  return (
    <div style={containerStyle}>
      <Typography variant="h6" style={headerStyle}>
        Unequal Split
      </Typography>
      <Box style={summaryStyle}>
        <Typography variant="body2" color="textSecondary">
          Total: ₹{amount.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Allocated: ₹{totalAllocated.toFixed(2)}
        </Typography>
        <Typography 
          variant="body2" 
          style={{ 
            color: isBalanced ? '#4caf50' : '#f44336',
            fontWeight: 'bold'
          }}
        >
          {isBalanced ? '✓ Balanced' : `Remaining: ₹${remaining.toFixed(2)}`}
        </Typography>
      </Box>
      
      <List>
        {participants.map((participant, index) => (
          <React.Fragment key={participant.userId}>
            <ListItem style={listItemStyle}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: '#1172ce' }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={participant.userName}
              />
              <TextField
                type="number"
                value={splits[participant.userId] || 0}
                onChange={(e) => handleAmountChange(participant.userId, e.target.value)}
                variant="outlined"
                size="small"
                style={{ width: '120px' }}
                InputProps={{
                  startAdornment: '₹'
                }}
              />
            </ListItem>
            {index < participants.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '16px'
};

const headerStyle: React.CSSProperties = {
  marginBottom: '16px'
};

const summaryStyle: React.CSSProperties = {
  marginBottom: '16px',
  padding: '12px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px'
};

const listItemStyle: React.CSSProperties = {
  paddingRight: '16px'
};

const emptyStyle: React.CSSProperties = {
  padding: '40px 20px',
  textAlign: 'center',
  margin: '20px'
};

export default UnEqualSplit;
