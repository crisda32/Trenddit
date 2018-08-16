import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authenticateReducer from './store/reducers/authenticateReducers';
import auxiliaryReducer from './store/reducers/auxiliaryReducers';
import redditReducer from './store/reducers/redditReducers';
import firebaseReducer from './store/reducers/firebaseReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    authReducer: authenticateReducer,
    auxReducer: auxiliaryReducer,
    redditReducer: redditReducer,
    firebaseReducer: firebaseReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
