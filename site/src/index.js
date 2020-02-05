import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import store from './store';
import App from './app';

import './style.css';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
