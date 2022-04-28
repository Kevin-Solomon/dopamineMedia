import { useContext, createContext, useReducer, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import axios from 'axios';
import { getIntialPost } from '../../service';
import { initialPostState, postReducer } from './../../reducer';
const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { authState } = useAuth();
  const [postState, postDispatch] = useReducer(postReducer, initialPostState);
  useEffect(() => {
    console.log('ineffect');
    const getIntialPost = async () => {
      if (authState.token !== null) {
        const response = await axios({ method: 'GET', url: '/api/posts' });
        console.log(response.data.posts);
        postDispatch({ type: 'INITIAL', payload: response.data.posts });
      }
    };
    getIntialPost();
  }, [authState.token]);
  return (
    <PostContext.Provider value={{ postState, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);
export { usePost, PostProvider };
