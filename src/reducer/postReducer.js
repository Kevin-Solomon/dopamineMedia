const initialPostState = {
  posts: [],
};

const postReducer = (state, { type, payload }) => {
  console.log(payload, 'in reducer');
  switch (type) {
    case 'INITIAL':
      return { posts: [...payload] };
    case 'ADD_POST':
      return { posts: [...payload] };
    case 'DELETE_POST':
      return { posts: [...payload] };
    default:
      return new Error('error in post reduccer');
  }
};
export { initialPostState, postReducer };
