import axios from 'axios';

const removeFromFollow = async (_id, token, followerDispatch) => {
  const response = await axios({
    method: 'POST',
    url: `/api/users/unfollow/${_id}`,
    headers: { authorization: token },
  });

  followerDispatch({
    type: 'REMOVE_FOLLOWER',
    payload: response.data.user.following.map(user => user._id),
  });
};
export { removeFromFollow };
