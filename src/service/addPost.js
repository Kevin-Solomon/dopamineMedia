import axios from 'axios';

const addPost = async (token, post, postDispatch) => {
  const response = await axios({
    method: 'POST',
    url: '/api/posts',
    headers: { authorization: token },
    data: { postData: post },
  });
  postDispatch({ type: 'ADD_POST', payload: response.data.posts });
};
export { addPost };
