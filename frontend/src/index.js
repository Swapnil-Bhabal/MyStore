import React from 'react';
import ReactDOM  from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
    <ChakraProvider>
    <App/>
    </ChakraProvider>
    </Provider>,document.querySelector('#root')
);