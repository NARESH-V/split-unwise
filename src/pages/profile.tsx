import React, {  } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../store/actions/userActions.ts';
import { RootState } from '../store/store.ts';
import { Avatar, Button, Container, Stack, Typography } from '@mui/material';

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.user.currentUser);

    const logOut = () => {
        googleLogout();
        dispatch(setCurrentUser(null))
    };

    return (
        <div>
            {profile ? (
                <Container>
                    <Stack direction="row" spacing={3} style={styles.profileData}>
                        <Avatar style={styles.profileImage} alt={profile.name} src={profile.picture} />
                        <div style={styles.profileName}>
                            <Typography>{profile.name}</Typography>
                            <Typography>{profile.email}</Typography>
                        </div>
                    </Stack>
                    <Stack direction="row" alignContent="center" justifyContent="center">
                        <Button variant="text" onClick={logOut}>Log out</Button>
                    </Stack>
                </Container>      
            ) : (
                <div>Error!!!</div>
            )}
        </div>
    );
};

const styles = {
    profileData: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 0 30px 0'
    },

    profileName: {
        display: 'grid',
        justifyItems: 'center',
        margin: '20px 0px'
    },

    profileImage: {
        height: '8rem',
        width: '8rem'
    }
}

export default Profile;