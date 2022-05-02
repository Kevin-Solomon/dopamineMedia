const ADD_TO_BOOKMARK = 'ADD_TO_BOOKMARK';
const REMOVE_FROM_BOOKMARK = 'REMOVE_FROM_BOOKMARK';
const bookmarkReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_BOOKMARK:
      return [...payload];
    case REMOVE_FROM_BOOKMARK:
      return [...payload];
    default:
      return new Error('error in bookmark reducer');
  }
};
export { bookmarkReducer };
