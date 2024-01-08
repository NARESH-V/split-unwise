import React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { Container, ListItem, ListItemAvatar } from '@mui/material';

const GroupListItem = (props) => {
    const data = props.data;
    const shortName = (name) => {
     const [first, last] =  name.toUpperCase().split(' ');
     return first[0] + last[0];
    }
  return(
    <ListItem style={{width: 'auto'}}>
      <Container style={styles.groupCard} className='groupCard' >
        <ListItemAvatar  style={styles.imageContainer}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: '5rem', height: '5rem' }}>{shortName(data.groupName)}</Avatar>
        </ListItemAvatar>
        <div style={styles.detailsContainer}>
          <h2>{data.groupName}</h2>
          <p>{data.description}</p>
        </div>
      </Container>
    </ListItem>
  );
};

const styles = {
    imageContainer: {
        display: 'flex',
        alignItems: 'center'
    },

    detailsContainer: {
        flex: '1',
        padding: '20px',
    },

    groupCard: {
        padding: '20px',
        display: 'flex',
        boxShadow: '#9a9898 4px 4px 15px -5px',
        border: 'solid 1px gainsboro',
        borderRadius: '15px',
        marginBottom: '10px'
    },
}

export default GroupListItem;