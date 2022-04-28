import { useContext, createContext, useReducer, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import { getIntialPost } from '../../service';
import { initialPostState, postReducer } from './../../reducer';
const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { authState } = useAuth();
  const [postState, postDispatch] = useReducer(postReducer, initialPostState);
  useEffect(() => {
    getIntialPost(postDispatch);
  }, [authState.token]);
  console.log(postState);
  return (
    <PostContext.Provider value={{ postState, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);
export { usePost, PostProvider };
