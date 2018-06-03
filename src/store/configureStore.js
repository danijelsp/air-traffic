import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// import rootReducer
import rootReducer from '../reducers';

const middleWares = [thunk];

if (process.env.NODE_ENV) {
    middleWares.push(logger);
}

export default (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleWares)
    );
};