const ADD_FOLLOWER = 'ADD_FOLLOWER';
const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER';
const followerReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_FOLLOWER:
      return [...payload];
    case REMOVE_FOLLOWER:
      return [...payload];
    default:
      return new Error('error occured in follower reducer');
  }
};

export { followerReducer };
