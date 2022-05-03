import axios from 'axios';
const addToFollowers = async (_id, token, followerDispatch) => {
  const response = await axios({
    method: 'POST',
    url: `/api/users/follow/${_id}`,
    headers: { authorization: token },
  });
  const followerId = response.data.user.following.map(
    follow => follow.username
  );
  followerDispatch({
    type: 'ADD_FOLLOWER',
    payload: followerId,
  });
};
export { addToFollowers };
