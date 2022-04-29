import axios from 'axios';
const updatePost = async (_id, post, token, postDispatch) => {
  const response = await axios({
    method: 'POST',
    headers: { authorization: token },
    url: `/api/posts/edit/${_id}`,
    data: { postData: post },
  });
  console.log(response);
  postDispatch({ type: 'UPDATE_POST', payload: response.data.posts });
};
export { updatePost };
