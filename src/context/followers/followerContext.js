import { createContext, useReducer, useEffect, useContext } from 'react';
import { followerReducer } from '../../reducer';
const FollowerContext = createContext();
const FollowerProvider = ({ children }) => {
  const [followerState, followerDispatch] = useReducer(followerReducer, []);
  return (
    <FollowerContext.Provider value={{ followerState, followerDispatch }}>
      {children}
    </FollowerContext.Provider>
  );
};

const useFollowers = () => useContext(FollowerContext);

export { useFollowers, FollowerProvider };
