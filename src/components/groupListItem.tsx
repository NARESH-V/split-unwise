import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Container, ListItem, ListItemAvatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setCurrentGroup } from '../store/actions/groupActions.ts';
import { useDispatch } from 'react-redux';

const GroupListItem = (props) => {
    const data = props.data;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shortName = (name) => {
      return name.toUpperCase()[0];
    };

    const generateColor = () => {
      return `#${Math.random().toString(16).substr(-6)}`;
    };

    const handleClick = () => {
      navigate('groupExpense');
      dispatch(setCurrentGroup(data));
    }

  return(
    <ListItem style={{width: 'auto'}} onClick={handleClick}>
      <Container style={styles.groupCard} className='groupCard' >
        <ListItemAvatar  style={styles.imageContainer}>
          <Avatar sx={{ bgcolor: generateColor, width: '5rem', height: '5rem' }}>{shortName(data.name)}</Avatar>
        </ListItemAvatar>
        <div style={styles.detailsContainer}>
          <h2 style={styles.groupName}>{data.name}</h2>
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

    groupName: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '185px'
    }
}

export default GroupListItem;