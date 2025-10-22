import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  IconButton,
  Paper,
  Box,
  Chip
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GroupService } from '../services/groupService.ts';
import { RootState } from '../store/store';
import { setExpenses } from '../store/actions/expenseActions.ts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ExpenseDetail from '../dialogs/expenseDetail.tsx';

const GroupExpense = () => {
  const groupService = new GroupService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const group = useSelector((state: RootState) => state.groups.currentGroup);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Calculate user's share for an expense
  const getUserExpenseStatus = (expense: any) => {
    if (!currentUser) return { status: 'not_involved', amount: 0, text: 'Not involved' };

    const userId = parseInt(currentUser.id || '0');
    const paidByUser = expense.paidBy === userId;
    const userSplit = expense.splitDetails?.find((split: any) => split.userId === userId);

    if (!paidByUser && !userSplit) {
      return { status: 'not_involved', amount: 0, text: 'Not involved' };
    }

    if (paidByUser && !userSplit) {
      // User paid but not in split - they are owed the full amount
      return { status: 'owed', amount: expense.amount, text: `You are owed ₹${expense.amount.toFixed(2)}` };
    }

    if (paidByUser && userSplit) {
      // User paid and is in split - they are owed (total - their share)
      const owedAmount = expense.amount - userSplit.amount;
      if (owedAmount > 0) {
        return { status: 'owed', amount: owedAmount, text: `You are owed ₹${owedAmount.toFixed(2)}` };
      } else {
        return { status: 'settled', amount: 0, text: 'Settled' };
      }
    }

    if (!paidByUser && userSplit) {
      // User didn't pay but is in split - they owe
      return { status: 'owes', amount: userSplit.amount, text: `You owe ₹${userSplit.amount.toFixed(2)}` };
    }

    return { status: 'not_involved', amount: 0, text: 'Not involved' };
  };

  const handleExpenseClick = (expense: any) => {
    setSelectedExpense(expense);
    setDetailDialogOpen(true);
  };

  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
    setSelectedExpense(null);
  };

  // Calculate balances with each individual
  const calculateBalances = () => {
    if (!currentUser || expenses.length === 0) {
      return { overall: 0, individuals: [] };
    }

    const userId = parseInt(currentUser.id || '0');
    const balances: { [key: number]: { name: string; amount: number } } = {};

    expenses.forEach((expense: any) => {
      const paidBy = expense.paidBy;
      const paidByName = expense.paidByName;

      // Process each split detail
      expense.splitDetails?.forEach((split: any) => {
        if (split.userId === userId && paidBy !== userId) {
          // Current user owes someone
          if (!balances[paidBy]) {
            balances[paidBy] = { name: paidByName, amount: 0 };
          }
          balances[paidBy].amount -= split.amount; // Negative means we owe them
        } else if (split.userId !== userId && paidBy === userId) {
          // Someone owes current user
          if (!balances[split.userId]) {
            balances[split.userId] = { name: split.userName, amount: 0 };
          }
          balances[split.userId].amount += split.amount; // Positive means they owe us
        }
      });
    });

    // Calculate overall balance
    const overall = Object.values(balances).reduce((sum, b) => sum + b.amount, 0);

    // Convert to array and sort by amount
    const individuals = Object.entries(balances)
      .map(([userId, data]) => ({
        userId: parseInt(userId),
        name: data.name,
        amount: data.amount
      }))
      .filter(b => Math.abs(b.amount) > 0.01) // Filter out near-zero balances
      .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount)); // Sort by absolute amount

    return { overall, individuals };
  };

  const balanceInfo = calculateBalances();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (group) {
        setLoading(true);
        const expenseData = await groupService.getGroupExpense(group.groupId);
        dispatch(setExpenses(expenseData));
        setLoading(false);
      } else {
        // No group selected, redirect to groups page
        navigate('/');
      }
    };

    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  const handleDeleteExpense = async (expenseId: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await groupService.deleteExpense(expenseId);
        // Refresh expenses after deletion
        if (group) {
          const expenseData = await groupService.getGroupExpense(group.groupId);
          dispatch(setExpenses(expenseData));
        }
      } catch (error) {
        alert('Failed to delete expense');
      }
    }
  };

  if (loading) {
    return (
      <Container style={centerStyle}>
        <CircularProgress />
      </Container>
    );
  }

  if (!group) {
    return (
      <Container style={centerStyle}>
        <Typography variant="h6" color="textSecondary">
          No group selected
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container style={containerStyle}>
        <Typography variant="h5" style={headerStyle}>
          {group.name}
        </Typography>
        {group.description && (
          <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
            {group.description}
          </Typography>
        )}
        
        {/* Display Members - Stacked Avatars */}
        {group.members && group.members.length > 0 && (
          <Box style={membersStackStyle}>
            {group.members.slice(0, 7).map((member, index) => (
              <Avatar
                key={member.userId}
                title={`${member.userName} - ${member.role}`}
                style={{
                  width: 36,
                  height: 36,
                  fontSize: '0.9rem',
                  backgroundColor: member.role === 'admin' ? '#1172ce' : '#4caf50',
                  border: '2px solid white',
                  marginLeft: index === 0 ? '0' : '-12px',
                  position: 'relative' as 'relative',
                  zIndex: 7 - index,
                  cursor: 'pointer'
                }}
              >
                {member.userName.charAt(0).toUpperCase()}
              </Avatar>
            ))}
            {group.members.length > 7 && (
              <Avatar
                title={`+${group.members.length - 7} more members`}
                style={{
                  width: 36,
                  height: 36,
                  fontSize: '0.8rem',
                  backgroundColor: '#9e9e9e',
                  border: '2px solid white',
                  marginLeft: '-12px',
                  position: 'relative' as 'relative',
                  zIndex: 0,
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                +{group.members.length - 7}
              </Avatar>
            )}
          </Box>
        )}

        {/* Balance Summary */}
        {expenses.length > 0 && (
          <Paper style={balanceSummaryStyle}>
            <Typography variant="subtitle2" style={{marginBottom: '12px', fontWeight: 'bold'}}>
              Your Balance Summary
            </Typography>
            
            {/* Overall Balance */}
            <Box style={{
              padding: '12px',
              backgroundColor: balanceInfo.overall >= 0 ? '#e8f5e9' : '#ffebee',
              borderRadius: '8px',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="textSecondary">
                Overall Balance
              </Typography>
              <Typography variant="h5" style={{
                fontWeight: 'bold',
                color: balanceInfo.overall >= 0 ? '#4caf50' : '#f44336'
              }}>
                {balanceInfo.overall >= 0 ? '+' : ''}₹{balanceInfo.overall.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {balanceInfo.overall > 0 ? 'You are owed' : balanceInfo.overall < 0 ? 'You owe' : 'All settled'}
              </Typography>
            </Box>

            {/* Individual Balances */}
            {balanceInfo.individuals.length > 0 && (
              <Box>
                <Typography variant="body2" style={{marginBottom: '8px', fontWeight: 'bold', color: '#666'}}>
                  Individual Balances
                </Typography>
                <List dense style={{padding: 0}}>
                  {balanceInfo.individuals.map((person, index) => (
                    <React.Fragment key={person.userId}>
                      <ListItem style={{paddingLeft: 0, paddingRight: 0}}>
                        <ListItemAvatar>
                          <Avatar style={{
                            width: 36,
                            height: 36,
                            fontSize: '0.9rem',
                            backgroundColor: person.amount >= 0 ? '#4caf50' : '#ff9800'
                          }}>
                            {person.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={person.name}
                          secondary={
                            person.amount >= 0 
                              ? `Owes you ₹${person.amount.toFixed(2)}`
                              : `You owe ₹${Math.abs(person.amount).toFixed(2)}`
                          }
                          primaryTypographyProps={{ style: { fontWeight: 500 } }}
                        />
                        <Chip
                          label={`₹${Math.abs(person.amount).toFixed(2)}`}
                          size="small"
                          style={{
                            backgroundColor: person.amount >= 0 ? '#4caf50' : '#ff9800',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </ListItem>
                      {index < balanceInfo.individuals.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        )}

        {expenses.length === 0 ? (
          <Paper style={emptyStateStyle}>
            <ReceiptLongIcon style={{ fontSize: 60, color: '#ccc' }} />
            <Typography variant="h6" color="textSecondary">
              No expenses yet
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Add an expense to get started
            </Typography>
          </Paper>
        ) : (
          <List style={listStyle}>
            {expenses.map((expense, index) => {
              const userStatus = getUserExpenseStatus(expense);
              return (
                <React.Fragment key={expense.expenseId}>
                  <ListItem
                    style={listItemStyle}
                    button
                    onClick={() => handleExpenseClick(expense)}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteExpense(expense.expenseId);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#1172ce' }}>
                        <ReceiptLongIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={expense.description}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Paid by {expense.paidByName || 'Unknown'}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textSecondary">
                            Split: {expense.splitMethod}
                          </Typography>
                          <br />
                          <Typography 
                            component="span" 
                            variant="body2" 
                            style={{
                              fontWeight: 'bold',
                              color: userStatus.status === 'owed' ? '#4caf50' : 
                                     userStatus.status === 'owes' ? '#f44336' : 
                                     '#9e9e9e'
                            }}
                          >
                            {userStatus.text}
                          </Typography>
                        </>
                      }
                    />
                    <Typography variant="h6" style={amountStyle}>
                      ₹{expense.amount.toFixed(2)}
                    </Typography>
                  </ListItem>
                  {index < expenses.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Container>
      
      {/* Expense Detail Dialog */}
      <ExpenseDetail
        open={detailDialogOpen}
        handleClose={handleDetailDialogClose}
        expense={selectedExpense}
      />
    </>
  );
};

const containerStyle: React.CSSProperties = {
  paddingTop: '20px',
  paddingBottom: '80px'
};

const headerStyle: React.CSSProperties = {
  marginBottom: '8px',
  fontWeight: 'bold'
};

const descriptionStyle: React.CSSProperties = {
  marginBottom: '20px'
};

const balanceSummaryStyle: React.CSSProperties = {
  padding: '16px',
  marginTop: '16px',
  marginBottom: '16px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const listStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  marginTop: '20px'
};

const listItemStyle: React.CSSProperties = {
  padding: '16px'
};

const amountStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#1172ce',
  marginRight: '50px'
};

const centerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px'
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

const membersStackStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '16px',
  marginBottom: '8px',
  marginLeft: '4px'
};

export default GroupExpense;