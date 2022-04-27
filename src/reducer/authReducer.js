const initialAuthState = {
  user: null,
  token: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      console.log('ehy');
      localStorage.setItem('user', payload.user);
      localStorage.setItem('token', payload.token);
      return { user: payload.user, token: payload.token };
    case 'PRESIST':
      return { user: payload.user, token: payload.token };
    default:
      new Error('error in auth reducer');
  }
};

export { authReducer, initialAuthState };
