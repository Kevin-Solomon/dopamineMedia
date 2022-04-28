import axios from 'axios';

const getIntialPost = async postDispatch => {
  const response = await axios({ method: 'GET', url: '/api/posts' });
  console.log(response);
  postDispatch({ type: 'INITIAL', payload: response.data.posts });
};
export { getIntialPost };
