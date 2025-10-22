import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserService } from '../services/userService.ts';
import { setCurrentUser } from '../store/actions/userActions.ts';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { Box } from '@mui/material';
import { OAuthUser } from '../common/models.ts';
import UserRegistration from './register.tsx';

const Login = () => {
    const userService = new UserService();

    const [ oAuthUser, setOAuthUser ] = useState<OAuthUser | null>(null);
    const [openRegister, setOpenRegister] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setOAuthUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (oAuthUser) {
                userService.getUserDataFromOAuth(oAuthUser)
                    .then(async (res) => {
                        const userData = res.data;
                        
                        // Check if user exists in local storage
                        let user = await userService.getUserByEmail(userData.email);
                        
                        // If user doesn't exist, auto-register them
                        if (!user) {
                            user = await userService.registerUser({
                                name: userData.name,
                                email: userData.email,
                                picture: userData.picture,
                                id: String(Date.now())
                            });
                        }
                        
                        // Update with Google user data
                        const currentUser = {
                            ...user,
                            picture: userData.picture
                        };
                        
                        dispatch(setCurrentUser(currentUser));
                        navigate('/');
                    })
                    .catch((err) => {
                        console.error('Login error:', err);
                        alert('Failed to login. Please try again.');
                    });
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ oAuthUser, dispatch, navigate ]
    );

    const handleClose = () => {
        setOpenRegister(false);
    };

  return (
    <>
        <Box style={styles.loginButton}>
            <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => login()}
            >
                Sign in with Google
            </Button>
        </Box>
        <UserRegistration open={openRegister} handleClose={handleClose} />
    </>
  );
};

const styles = {
    loginButton: {
        position: 'absolute' as 'absolute',
        top: '70%',
        width: '-webkit-fill-available'
    } 
}
export default Login;