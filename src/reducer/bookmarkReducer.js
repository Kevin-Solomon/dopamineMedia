const ADD_TO_BOOKMARK = 'ADD_TO_BOOKMARK';
const REMOVE_FROM_BOOKMARK = 'REMOVE_FROM_BOOKMARK';
const INITIAL = 'INITIAL';
const bookmarkReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_BOOKMARK:
      return [...payload];
    case REMOVE_FROM_BOOKMARK:
      return [...payload];
    case INITIAL:
      return [...payload];
    default:
      return new Error('error in bookmark reducer');
  }
};
export { bookmarkReducer };
