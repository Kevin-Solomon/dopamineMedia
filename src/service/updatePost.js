import axios from 'axios';
const updatePost = async (_id, post, token, postDispatch) => {
  try {
    const response = await axios({
      method: 'POST',
      headers: { authorization: token },
      url: `/api/posts/edit/${_id}`,
      data: { postData: post },
    });
    postDispatch({ type: 'UPDATE_POST', payload: response.data.posts });
  } catch (err) {
    console.log(err);
  }
};
export { updatePost };
