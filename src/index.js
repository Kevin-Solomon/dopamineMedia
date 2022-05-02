import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { makeServer } from './server';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, BookmarkProvider, PostProvider } from './context/';
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <PostProvider>
            <BookmarkProvider>
              <App />
            </BookmarkProvider>
          </PostProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
