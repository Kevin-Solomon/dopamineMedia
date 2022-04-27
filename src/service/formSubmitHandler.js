import axios from 'axios';

const formSubmitHandler = async (url, user, authDispatch, toast) => {
  try {
    const response = await axios({
      method: 'POST',
      url: url,
      data: user,
    });
    console.log(response);
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
            user: response.data.createdUser,
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
  } catch (err) {
    console.log(err.response);
    if ('response' in err) {
      toast({
        title: `${err.response.data.errors[0]}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
};

export { formSubmitHandler };
