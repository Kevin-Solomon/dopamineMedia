import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  useToast,
} from '@chakra-ui/react';
import { signUpUser } from '../../../../../feature/auth/authSlice';
import { useDispatch } from 'react-redux';
import { formSubmitHandler } from './../../../../../service';
import { useAuth } from '../../../../../context';
import { useNavigate } from 'react-router-dom';
function Signup({ prevpath }) {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: '', username: '', password: '' });
  const { authDispatch } = useAuth();
  const changeHandler = e => {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  return (
    <FormControl>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input
        border="1px"
        borderColor="blue.900"
        id="name"
        type="name"
        name="name"
        value={user.name}
        onChange={changeHandler}
      />
      <FormHelperText></FormHelperText>
      <FormLabel htmlFor="email">Username</FormLabel>
      <Input
        border="1px"
        borderColor="blue.900"
        id="email"
        type="name"
        name="username"
        value={user.username}
        onChange={changeHandler}
      />
      <FormHelperText></FormHelperText>
      <FormLabel htmlFor="password">Password</FormLabel>
      <Input
        border="1px"
        borderColor="blue.900"
        id="password"
        type="password"
        name="password"
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
          dispatch(signUpUser({ user, navigate, prevpath })).then(res => {
            toast({
              title: 'Sign In Successfully',
              description: `Hey, ${res.payload.user.name}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            navigate(prevpath || '/');
          });
        }}
      >
        Sign Up
      </Button>
    </FormControl>
  );
}

export default Signup;
