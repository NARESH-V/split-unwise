import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Paper,
  Checkbox
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

interface EqualSplitProps {
  amount?: number;
  participants?: Array<{ userId: number; userName: string }>;
  allParticipants?: Array<{ userId: number; userName: string }>;
  onParticipantChange?: (participants: Array<{ userId: number; userName: string }>) => void;
}

const EqualSplit: React.FC<EqualSplitProps> = ({ 
  amount = 0, 
  participants = [], 
  allParticipants = [],
  onParticipantChange 
}) => {
  const splitAmount = participants.length > 0 ? amount / participants.length : 0;
  const availableParticipants = allParticipants.length > 0 ? allParticipants : participants;

  const handleToggle = (participant: { userId: number; userName: string }) => {
    if (!onParticipantChange) return;
    
    const isSelected = participants.some(p => p.userId === participant.userId);
    
    if (isSelected) {
      // Remove participant
      const newParticipants = participants.filter(p => p.userId !== participant.userId);
      if (newParticipants.length > 0) {
        onParticipantChange(newParticipants);
      }
    } else {
      // Add participant
      onParticipantChange([...participants, participant]);
    }
  };

  if (availableParticipants.length === 0) {
    return (
      <Paper style={emptyStyle}>
        <Typography variant="body1" color="textSecondary">
          No participants available
        </Typography>
      </Paper>
    );
  }

  return (
    <div style={containerStyle}>
      <Typography variant="h6" style={headerStyle}>
        Split Equally
      </Typography>
      {participants.length > 0 && (
        <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
          Each person pays ₹{splitAmount.toFixed(2)}
        </Typography>
      )}
      
      <List>
        {availableParticipants.map((participant, index) => {
          const isSelected = participants.some(p => p.userId === participant.userId);
          return (
            <React.Fragment key={participant.userId}>
              <ListItem
                button
                onClick={() => handleToggle(participant)}
                style={{
                  backgroundColor: isSelected ? '#f5f5f5' : 'transparent'
                }}
              >
                <Checkbox
                  edge="start"
                  checked={isSelected}
                  tabIndex={-1}
                  disableRipple
                  style={{ marginRight: 8 }}
                />
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: isSelected ? '#1172ce' : '#9e9e9e' }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={participant.userName}
                  secondary={isSelected ? `Owes ₹${splitAmount.toFixed(2)}` : 'Not included'}
                  primaryTypographyProps={{
                    style: { fontWeight: isSelected ? 500 : 400 }
                  }}
                />
              </ListItem>
              {index < availableParticipants.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '16px'
};

const headerStyle: React.CSSProperties = {
  marginBottom: '8px'
};

const descriptionStyle: React.CSSProperties = {
  marginBottom: '16px'
};

const emptyStyle: React.CSSProperties = {
  padding: '40px 20px',
  textAlign: 'center',
  margin: '20px'
};

export default EqualSplit;