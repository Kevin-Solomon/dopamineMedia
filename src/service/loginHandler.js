import axios from 'axios';

const loginHandler = async (username, password, authDispatch) => {
  const response = await axios({
    method: 'POST',
    url: '/api/auth/login',
    data: { username, password },
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
