const ADD_FOLLOWER = 'ADD_FOLLOWER';
const followerReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_FOLLOWER:
      return [...payload];
    default:
      return new Error('error occured in follower reducer');
  }
};

export { followerReducer };
