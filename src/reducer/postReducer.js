const initialPostState = {
  posts: [],
};

const postReducer = (state, { type, payload }) => {
  console.log(payload, 'in reducer');
  switch (type) {
    case 'INITIAL':
      return { posts: [...payload] };
    default:
      return new Error('error in post reduccer');
  }
};
export { initialPostState, postReducer };
