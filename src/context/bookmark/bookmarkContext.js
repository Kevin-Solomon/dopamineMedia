import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { bookmarkReducer } from '../../reducer';
import { useAuth } from '../auth/authContext';
const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const { authState } = useAuth();
  const [bookmarkState, bookmarkDispatch] = useReducer(bookmarkReducer, []);
  useEffect(() => {
    async function getBookmarks() {
      const response = await axios({
        method: 'GET',
        url: '/api/users/bookmark',
        headers: { authorization: token },
      });
      bookmarkDispatch({ type: 'INITIAL', payload: response.data.bookmarks });
    }
    getBookmarks();
  }, [authState.token]);
  return (
    <BookmarkContext.Provider value={{ bookmarkState, bookmarkDispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

const useBookmark = () => useContext(BookmarkContext);

export { useBookmark, BookmarkProvider };
