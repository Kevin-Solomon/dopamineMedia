import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialAuthState, authReducer } from '../../reducer';
const AuthContext = createContext({ user: null, token: null });

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user === null) return;
    if (user) {
      authDispatch({ type: 'PERSIST', payload: { user, token } });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
