import axios from 'axios';

const addToBookmark = async (_id, token, bookmarkDispatch) => {
  const response = await axios({
    method: 'POST',
    headers: { authorization: token },
    url: `/api/users/bookmark/${_id}`,
  });
  console.log(response);
  bookmarkDispatch({
    type: 'ADD_TO_BOOKMARK',
    payload: response.data.bookmarks,
  });
};
export { addToBookmark };
