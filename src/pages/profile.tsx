import React, {  } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../store/actions/userActions.ts';
import { RootState } from '../store/store.ts';

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
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <div>Error!!!</div>
            )}
        </div>
    );
};

export default Profile;