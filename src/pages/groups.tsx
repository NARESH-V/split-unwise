import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import GroupListItem from '../components/groupListItem.tsx';
import { GroupService } from '../services/groupService.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { setCurrentGroup, setGroupList } from '../store/actions/groupActions.ts';


const Groups = () => {
  const groupService = new GroupService();

  const dispatch = useDispatch();
  const groupData = useSelector((state: RootState) => state.groups.groups);

  useEffect( () => {
      dispatch(setGroupList(groupService.getGroupList()));
      dispatch(setCurrentGroup(null));
  },[])

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

export default Groups;