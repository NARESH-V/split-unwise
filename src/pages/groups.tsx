import { Container, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupListItem from '../components/groupListItem.tsx';
import { GroupService } from '../services/groupService.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { setCurrentGroup, setGroupList } from '../store/actions/groupActions.ts';


const Groups = () => {
  const groupService = new GroupService();
  const dispatch = useDispatch();
  const groupData = useSelector((state: RootState) => state.groups.groups);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      dispatch(setCurrentGroup(null));
      
      if (currentUser?.id) {
        const groups = await groupService.getGroupList(parseInt(currentUser.id));
        dispatch(setGroupList(groups));
      }
      setLoading(false);
    };

    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (loading) {
    return (
      <Container style={centerStyle}>
        <CircularProgress />
      </Container>
    );
  }

  if (groupData.length === 0) {
    return (
      <Container style={centerStyle}>
        <Typography variant="h6" color="textSecondary">
          No groups yet. Create one to get started!
        </Typography>
      </Container>
    );
  }

  return(
    <>
      <Container style={groupListStyle} className='groupList'>
        {groupData?.map((group, index) => <GroupListItem data={group} key={index} />)}     
      </Container>   
    </>
  );
};

const groupListStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: '10px'
}

const centerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px'
}

export default Groups;