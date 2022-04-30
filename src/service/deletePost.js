import axios from 'axios';
const deletePost = async (token, _id, postDispatch) => {
  const response = await axios({
    method: 'DELETE',
    url: `/api/posts/${_id}`,
    headers: { authorization: token },
  });
  postDispatch({ type: 'DELETE_POST', payload: response.data.posts });
};
export { deletePost };
