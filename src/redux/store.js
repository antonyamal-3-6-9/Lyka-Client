import rootReducer from './rootReducer';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'


const store = configureStore({reducer: rootReducer,
    middleware: [thunk]
});

export default store;
