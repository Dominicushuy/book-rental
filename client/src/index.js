import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-image-crop/dist/ReactCrop.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { createStore , applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise' ;
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';

import {StripeProvider} from 'react-stripe-elements';



const createStoreWithMiddleware = applyMiddleware(ReduxThunk,promiseMiddleware)(createStore)

ReactDOM.render(
    <StripeProvider apiKey="pk_test_10CatPBLd02tbHYY1PByTOX4">
    
        <Provider store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )} >
            
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
            
        </Provider>
    </StripeProvider>

    
, document.getElementById('root'));

