import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../../../../../context';
import { loginUser } from './../../../../../feature/auth/authSlice';
import { useDispatch } from 'react-redux';
function Login({ prevpath }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const changeHandler = e => {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const { authState, authDispatch } = useAuth();
  const dispatch = useDispatch();
  return (
    <FormControl>
      <FormLabel htmlFor="usernam e">Username</FormLabel>
      <Input
        id="username"
        name="username"
        type="username"
        value={user.username}
        onChange={changeHandler}
      />
      <FormHelperText></FormHelperText>
      <FormLabel name="password" htmlFor="password">
        Password
      </FormLabel>
      <Input
        name="password"
        id="password"
        type="password"
        value={user.password}
        onChange={changeHandler}
      />
      <FormHelperText></FormHelperText>

      <Button
        marginTop="10px"
        w="100%"
        colorScheme="blue"
        onClick={async e => {
          try {
            e.preventDefault();
            const response = await dispatch(loginUser(user));
            toast({
              title: 'Logged In Successfully',
              description: `Welcome back, ${response.payload.user.firstName}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            navigate(prevpath || '/');
          } catch (err) {
            toast({
              title: 'Something went wrong',
              description: `Do you want to report this issue`,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            console.log(err);
          }
        }}
      >
        Login
      </Button>
      <Button
        marginTop="10px"
        w="100%"
        colorScheme="blue"
        onClick={e => {
          e.preventDefault();
          setUser({ username: 'adarshbalika', password: 'adarshBalika123' });
        }}
      >
        Login with Test Credentials
      </Button>
    </FormControl>
  );
}

export default Login;
