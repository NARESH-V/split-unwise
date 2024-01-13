import { Container } from '@mui/material';
import React from 'react';
import GroupListItem from '../components/groupListItem.tsx';
import { GROUPS } from '../common/constants.tsx';


const Groups = () => {
  const groupData = GROUPS;

  return(
    <>
      <Container style={groupListStyle} className='groupList'>
        {groupData.map((group, index) => <GroupListItem data={group} key={index} />)}     
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