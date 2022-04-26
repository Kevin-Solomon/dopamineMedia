import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
} from '@chakra-ui/react';
function Signup() {
  return (
    <FormControl>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input border="1px" borderColor="blue.900" id="name" type="name" />
      <FormHelperText></FormHelperText>
      <FormLabel htmlFor="email">Email address</FormLabel>
      <Input border="1px" borderColor="blue.900" id="email" type="email" />
      <FormHelperText></FormHelperText>
      <FormLabel htmlFor="password">Password</FormLabel>
      <Input
        border="1px"
        borderColor="blue.900"
        id="password"
        type="password"
      />
      <FormHelperText></FormHelperText>

      <Button marginTop="10px" w="100%" colorScheme="blue">
        Sign Up
      </Button>
    </FormControl>
  );
}

export default Signup;
