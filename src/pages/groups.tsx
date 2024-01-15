import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupListItem from '../components/groupListItem.tsx';
import { GROUPS } from '../common/constants.tsx';
import { GroupService } from '../services/groupService.ts';
import { Group } from '../common/models.ts';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { addGroup, removeGroup, setGroupList } from '../store/actions/groupActions.ts';


const Groups = () => {
  const groupService = new GroupService();
  const dispatch = useDispatch();
  const groupData = useSelector((state: RootState) => state.groups.groups);
  // const [groupData, setGroupData] = useState<Group[] | null>([]);

  useEffect( () => {
      dispatch(setGroupList(groupService.getGroupList()));
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

const mapStateToProps = (state) => ({
  groups: state.groups.groups,
});

const mapDispatchToProps = {
  addGroup,
  removeGroup,
  setGroupList
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);