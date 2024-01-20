import rootReducer from './rootReducer';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'
import { initialAction } from './actions/authUserActions';


const store = configureStore({reducer: rootReducer,
    middleware: [thunk]
});

store.dispatch(initialAction())

export default store;
