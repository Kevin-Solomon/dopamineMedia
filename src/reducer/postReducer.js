const initialPostState = {
  posts: [],
};

const postReducer = (state, { type, payload }) => {
  switch (type) {
    case 'INITIAL':
      return { posts: [...payload] };
    case 'ADD_POST':
      return { posts: [...payload] };
    case 'DELETE_POST':
      return { posts: [...payload] };
    case 'UPDATE_POST':
      return { posts: [...payload] };
    case 'ADD_TO_LIKE':
      return { posts: [...payload] };
    case 'REMOVE_FROM_LIKE':
      return { posts: [...payload] };
    default:
      return new Error('error in post reduccer');
  }
};
export { initialPostState, postReducer };
