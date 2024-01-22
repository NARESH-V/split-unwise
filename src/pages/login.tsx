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
                    .then((res) => {
                        const user = userService.getUserByEmail(res.data.email);
                        // if(user){
                        if(res.data.name.toLowerCase()==='naresh v'){
                        dispatch(setCurrentUser(res.data));
                        navigate('/');}
                        else{
                            setOpenRegister(true);
                            alert('user not registered');
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ oAuthUser ]
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
        position: 'absolute',
        top: '70%',
        width: '-webkit-fill-available'
    } 
}
export default Login;