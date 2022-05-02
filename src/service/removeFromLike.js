import axios from 'axios';

const removeFromLike = async (_id, token, postDispatch) => {
  const response = await axios({
    method: 'POST',
    url: `/api/posts/dislike/${_id}`,
    headers: { authorization: token },
  });
  console.log(response);
  postDispatch({ type: 'REMOVE_FROM_LIKE', payload: response.data.posts });
};
export { removeFromLike };
