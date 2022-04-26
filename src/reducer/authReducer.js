const initialAuthState = {
  user: null,
  token: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return { user: payload.user, token: payload.token };
    default:
      new Error('error in auth reducer');
  }
};

export { authReducer, initialAuthState };
