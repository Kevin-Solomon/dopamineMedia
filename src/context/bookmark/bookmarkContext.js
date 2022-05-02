import { createContext, useContext, useReducer, useEffect } from 'react';
import { bookmarkReducer } from '../../reducer';
const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [bookmarkState, bookmarkDispatch] = useReducer(bookmarkReducer, []);
  return (
    <BookmarkContext.Provider value={{ bookmarkState, bookmarkDispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

const useBookmark = () => useContext(BookmarkContext);

export { useBookmark, BookmarkProvider };
