import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
} from '@chakra-ui/react';
import { useAuth } from './../../../../../context';
import { loginHandler } from './../../../../../service';
function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const changeHandler = e => {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const { authState, authDispatch } = useAuth();
  return (
    <FormControl>
      <FormLabel htmlFor="email">Email address</FormLabel>
      <Input
        id="email"
        name="email"
        type="email"
        value={user.email}
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
        onClick={() => loginHandler(user.email, user.password, authDispatch)}
      >
        Login
      </Button>
    </FormControl>
  );
}

export default Login;
