import { useContext, createContext, useReducer, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import axios from 'axios';
import { getIntialPost } from '../../service';
import { initialPostState, postReducer } from './../../reducer';
import { getAllPost } from './../../feature/post/postSlice';
import { useSelector, useDispatch } from 'react-redux';
const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { authState } = useAuth();
  const dispatch = useDispatch();
  const [postState, postDispatch] = useReducer(postReducer, initialPostState);
  useEffect(() => {
    const getIntialPost = async () => {
      if (authState.token !== null) {
        const response = await axios({ method: 'GET', url: '/api/posts' });
        postDispatch({ type: 'INITIAL', payload: response.data.posts });
      }
    };
    getIntialPost();
    dispatch(getAllPost());
  }, [authState.token]);
  return (
    <PostContext.Provider value={{ postState, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);
export { usePost, PostProvider };
