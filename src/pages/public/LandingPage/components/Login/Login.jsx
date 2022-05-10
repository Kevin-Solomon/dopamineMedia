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
import { formSubmitHandler } from './../../../../../service';
import { loginUser } from './../../../../../feature/auth/authSlice';
import { useDispatch } from 'react-redux';
function Login() {
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
        onClick={e => {
          e.preventDefault();
          dispatch(loginUser(user));
          formSubmitHandler('/api/auth/login', user, authDispatch, toast);
          navigate('/');
        }}
      >
        Login
      </Button>
    </FormControl>
  );
}

export default Login;
