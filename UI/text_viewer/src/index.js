import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux'; 
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './App';
import Reducer from './reducer';


const initialState = {};
const middleware = [thunk]

const store = createStore(
    Reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
    <Provider store={store}>
         <App/>
    </Provider>
   ,
    document.querySelector('#root')
);