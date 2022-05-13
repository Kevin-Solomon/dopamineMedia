import axios from 'axios';

const removeFromBookmark = async (_id, token, bookmarkDispatch) => {
  const response = await axios({
    method: 'POST',
    url: `/api/users/remove-bookmark/${_id}`,
    headers: { authorization: token },
  });
  bookmarkDispatch({
    type: 'REMOVE_FROM_BOOKMARK',
    payload: response.data.bookmarks,
  });
};
export { removeFromBookmark };
