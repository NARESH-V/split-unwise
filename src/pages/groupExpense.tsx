import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupListItem from '../components/groupListItem';
import { GroupService } from '../services/groupService.ts';
import { RootState } from '../store/store';

const GroupExpense = () => {
  const groupService = new GroupService();
  const dispatch = useDispatch();
  const group = useSelector((state: RootState) => state.groups.currentGroup);

  useEffect( () => {
    if(group) {
      groupService.getGroupExpense(group.groupId)
      // .then(res => dispatch(set))
    } 
  }, []);

  return(
    <>
      <Container style={expenseListStyle} className='groupList'>
        {group?.name}
      </Container>   
    </>
  );
};

const expenseListStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: '10px'
}
export default GroupExpense;