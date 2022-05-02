import axios from 'axios';
const postUser = async (
  token,
  userData,
  setUser,
  setEditUser,
  authDispatch
) => {
  const response = await axios({
    method: 'POST',
    url: '/api/users/edit',
    headers: { authorization: token },
    data: { userData },
  });
  setUser({ ...response.data.user });
  setEditUser({ ...response.data.user });
  authDispatch({ type: 'UPDATE_USER', payload: response.data.user });
  console.log(response);
};
export { postUser };
