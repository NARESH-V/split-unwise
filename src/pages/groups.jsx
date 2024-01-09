import { Container } from '@mui/material';
import React from 'react';
import GroupListItem from '../components/groupListItem';

const Groups = () => {
  const groupData = [
    {groupName : 'Naresh Venkat', description: 'random'},
    {groupName : 'Karthic Kumar', description: 'Random'},
    {groupName : 'Vasanth S', description: 'random'},
    {groupName : 'Balaji S', description: 'Random'},
    {groupName : 'Naresh Venkat 2', description: 'random'},
    {groupName : 'Balaji S', description: 'Random'},
    {groupName : 'Karthic Kumar 3', description: 'Random'},
  ];
  return(
    <>
      <Container style={styles.groupList} className='groupList'>
        {groupData.map(group => <GroupListItem data={group} />)}     
      </Container>
    </>
  );
};

const styles = {
  groupList: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '10px'
  },

}
export default Groups;