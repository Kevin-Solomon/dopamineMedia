import axios from 'axios';

const loginHandler = async (user, authDispatch) => {
  const response = await axios({
    method: 'POST',
    url: '/api/auth/login',
    data: user,
  });
  console.log(response);
  authDispatch({
    type: 'LOGIN',
    payload: {
      user: response.data.foundUser,
      token: response.data.encodedToken,
    },
  });
};

export { loginHandler };
