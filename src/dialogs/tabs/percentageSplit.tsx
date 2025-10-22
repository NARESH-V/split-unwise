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

interface PercentageSplitProps {
  amount?: number;
  participants?: Array<{ userId: number; userName: string }>;
  onSplitChange?: (splits: Array<{ userId: number; percentage: number; amount: number }>) => void;
}

const PercentageSplit: React.FC<PercentageSplitProps> = ({ 
  amount = 0, 
  participants = [],
  onSplitChange 
}) => {
  const [percentages, setPercentages] = useState<{ [key: number]: number }>({});
  const [totalPercentage, setTotalPercentage] = useState(0);

  useEffect(() => {
    // Initialize percentages with equal distribution
    const equalPercentage = participants.length > 0 ? 100 / participants.length : 0;
    const initialPercentages: { [key: number]: number } = {};
    participants.forEach(p => {
      initialPercentages[p.userId] = Number(equalPercentage.toFixed(2));
    });
    setPercentages(initialPercentages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants.length]);

  useEffect(() => {
    const total = Object.values(percentages).reduce((sum, val) => sum + val, 0);
    setTotalPercentage(total);
    
    if (onSplitChange && Object.keys(percentages).length > 0) {
      const splitArray = Object.entries(percentages).map(([userId, percentage]) => {
        const participant = participants.find(p => p.userId === Number(userId));
        return {
          userId: Number(userId),
          userName: participant?.userName || '',
          percentage,
          amount: (amount * percentage) / 100
        };
      });
      onSplitChange(splitArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentages, amount]);

  const handlePercentageChange = (userId: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setPercentages(prev => ({ ...prev, [userId]: numValue }));
  };

  const calculateAmount = (percentage: number) => {
    return (amount * percentage) / 100;
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

  const remaining = 100 - totalPercentage;
  const isBalanced = Math.abs(remaining) < 0.01;

  return (
    <div style={containerStyle}>
      <Typography variant="h6" style={headerStyle}>
        Split by Percentage
      </Typography>
      <Box style={summaryStyle}>
        <Typography variant="body2" color="textSecondary">
          Total Amount: ₹{amount.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total Percentage: {totalPercentage.toFixed(2)}%
        </Typography>
        <Typography 
          variant="body2" 
          style={{ 
            color: isBalanced ? '#4caf50' : '#f44336',
            fontWeight: 'bold'
          }}
        >
          {isBalanced ? '✓ Balanced' : `Remaining: ${remaining.toFixed(2)}%`}
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
                secondary={`₹${calculateAmount(percentages[participant.userId] || 0).toFixed(2)}`}
              />
              <TextField
                type="number"
                value={percentages[participant.userId] || 0}
                onChange={(e) => handlePercentageChange(participant.userId, e.target.value)}
                variant="outlined"
                size="small"
                style={{ width: '100px' }}
                InputProps={{
                  endAdornment: '%'
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 0.1
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

export default PercentageSplit;
