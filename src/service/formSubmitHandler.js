import axios from 'axios';

const formSubmitHandler = async (url, user, authDispatch, toast) => {
  const response = await axios({
    method: 'POST',
    url: url,
    data: user,
  });
  switch (response.status) {
    case 200:
      authDispatch({
        type: 'LOGIN',
        payload: {
          user: response.data.foundUser,
          token: response.data.encodedToken,
        },
      });
      toast({
        title: `Welcome Back ${response.data.foundUser.firstName}`,
        description: 'You have logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      break;
    case 201:
      authDispatch({
        type: 'SIGNUP',
        payload: {
          user: response.createdUser,
          token: response.data.encodedToken,
        },
      });
      toast({
        title: `Hey ${response.data.createdUser.name}`,
        description: 'We have created your account',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      break;
    default:
      return new Error('error in form submit handler');
  }
};

export { formSubmitHandler };
