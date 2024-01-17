import { combineReducers } from 'redux';
import authUserReducer from './reducers/authUserReducer';




const rootReducer = combineReducers({
    userAuth : authUserReducer
});



export default rootReducer