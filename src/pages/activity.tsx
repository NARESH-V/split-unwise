import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Activity as ActivityModel } from '../common/models';
import localStorageDB from '../services/localStorageDB.ts';
import { setActivities } from '../store/actions/expenseActions.ts';

const Activity = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.expenses.activities);

  useEffect(() => {
    // Load activities from local storage
    const loadedActivities = localStorageDB.getActivities();
    dispatch(setActivities(loadedActivities));
  }, [dispatch]);

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'expense_added':
        return <AddCircleOutlineIcon />;
      case 'expense_deleted':
        return <DeleteOutlineIcon />;
      case 'payment_made':
        return <PaymentIcon />;
      case 'group_created':
        return <GroupAddIcon />;
      default:
        return <AddCircleOutlineIcon />;
    }
  };

  const getActivityColor = (activityType: string) => {
    switch (activityType) {
      case 'expense_added':
        return '#4caf50';
      case 'expense_deleted':
        return '#f44336';
      case 'payment_made':
        return '#2196f3';
      case 'group_created':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getActivityDescription = (activity: ActivityModel) => {
    const actor = activity.createdByName || 'Someone';
    
    switch (activity.activityType) {
      case 'expense_added':
        return `${actor} added "${activity.description}"`;
      case 'expense_deleted':
        return `${actor} deleted "${activity.description}"`;
      case 'payment_made':
        return `${actor} made a payment of ₹${activity.amount}`;
      case 'group_created':
        return `${actor} created group "${activity.groupName}"`;
      default:
        return activity.description;
    }
  };

  return (
    <Container style={containerStyle}>
      <Typography variant="h5" style={headerStyle}>
        Activity
      </Typography>

      {activities.length === 0 ? (
        <Paper style={emptyStateStyle}>
          <AddCircleOutlineIcon style={{ fontSize: 60, color: '#ccc' }} />
          <Typography variant="h6" color="textSecondary">
            No activity yet
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Activities will appear here as you and your friends add expenses
          </Typography>
        </Paper>
      ) : (
        <List style={listStyle}>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.activityId}>
              <ListItem style={listItemStyle}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: getActivityColor(activity.activityType) }}>
                    {getActivityIcon(activity.activityType)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={getActivityDescription(activity)}
                  secondary={
                    <>
                      {activity.groupName && (
                        <>
                          <Chip 
                            label={activity.groupName} 
                            size="small" 
                            style={chipStyle}
                          />
                          <br />
                        </>
                      )}
                      <Typography component="span" variant="caption" color="textSecondary">
                        {formatDate(activity.createdAt)}
                      </Typography>
                    </>
                  }
                />
                {activity.amount > 0 && activity.activityType === 'expense_added' && (
                  <Typography variant="h6" style={amountStyle}>
                    ₹{activity.amount.toFixed(2)}
                  </Typography>
                )}
              </ListItem>
              {index < activities.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

const containerStyle: React.CSSProperties = {
  paddingTop: '20px',
  paddingBottom: '80px'
};

const headerStyle: React.CSSProperties = {
  marginBottom: '20px',
  fontWeight: 'bold'
};

const listStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  marginTop: '20px'
};

const listItemStyle: React.CSSProperties = {
  padding: '16px',
  alignItems: 'flex-start'
};

const amountStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#4caf50'
};

const emptyStateStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 20px',
  marginTop: '40px',
  textAlign: 'center'
};

const chipStyle: React.CSSProperties = {
  marginTop: '4px',
  marginRight: '8px'
};

export default Activity;