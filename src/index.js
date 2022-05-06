import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { makeServer } from './server';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import {
  AuthProvider,
  BookmarkProvider,
  FollowerProvider,
  PostProvider,
} from './context/';
import { Provider } from 'react-redux';
import { store } from './store/store';
// Call make Server
makeServer();
console.log(store);
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <PostProvider>
              <BookmarkProvider>
                <FollowerProvider>
                  <App />
                </FollowerProvider>
              </BookmarkProvider>
            </PostProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
