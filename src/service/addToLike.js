import axios from 'axios';

const addToLike = async (_id, token, postDispatch) => {
  const response = await axios({
    method: 'POST',
    url: `/api/posts/like/${_id}`,
    headers: { authorization: token },
  });
  postDispatch({ type: 'ADD_TO_LIKE', payload: response.data.posts });
  console.log(response);
};
export { addToLike };
