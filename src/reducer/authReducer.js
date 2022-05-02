const initialAuthState = {
  user: null,
  token: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(payload.user));
      localStorage.setItem('token', payload.token);
      return { user: payload.user, token: payload.token };
    case 'SIGNUP':
      localStorage.setItem('user', JSON.stringify(payload.user));
      localStorage.setItem('token', payload.token);
      return { user: payload.user, token: payload.token };
    case 'PERSIST':
      return { user: payload.user, token: payload.token };
    case 'UPDATE_USER':
      return { ...state, user: { ...payload } };
    default:
      new Error('error in auth reducer');
  }
};

export { authReducer, initialAuthState };
