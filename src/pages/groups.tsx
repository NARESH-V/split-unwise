import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupListItem from '../components/groupListItem.tsx';
import { GROUPS } from '../common/constants.tsx';
import { GroupService } from '../services/groupService.ts';
import { Group } from '../common/models.ts';


const Groups = () => {
  const groupService = new GroupService();
  const [groupData, setGroupData] = useState<Group[] | null>([]);

  useEffect( () => {
      setGroupData(groupService.getGroupList());
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