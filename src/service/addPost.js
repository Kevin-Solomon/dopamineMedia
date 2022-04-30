import axios from 'axios';

const addPost = async (token, post, postDispatch, toast) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/posts',
      headers: { authorization: token },
      data: { postData: post },
    });
    if (response.status === 201) {
      postDispatch({ type: 'ADD_POST', payload: response.data.posts });
      toast({
        title: 'Post has been published',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
export { addPost };
