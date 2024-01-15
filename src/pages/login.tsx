import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserService } from '../services/userService.ts';
import { setCurrentUser } from '../store/actions/userActions.ts';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { Container } from '@mui/material';
import { OAuthUser } from '../common/models.ts';

const UserRegistration = () => {
    const userService = new UserService();

    const [ oAuthUser, setOAuthUser ] = useState<OAuthUser | null>(null);
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
                    .then((res) => {
                        dispatch(setCurrentUser(res.data));
                        navigate('/');
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ oAuthUser ]
    );

  return (
    <Container style={styles.loginButton}>
        <Button 
            variant="outlined" 
            startIcon={<GoogleIcon />}
            onClick={() => login()} 
        >
            Sign in with Google
        </Button>
    </Container>
  );
};

const styles = {
    loginButton: {
        position: 'absolute',
        top: '70%'
    } 
}
export default UserRegistration;