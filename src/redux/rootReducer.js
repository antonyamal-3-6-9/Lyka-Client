import { combineReducers } from 'redux';
import authCustomerReducer from './customerAuth/reducers/authCustomerReducer';
import authSellerReducer from './sellerAuth/reducers/authSellerReducers';
import authUserReducer from './reducers/authUserReducer';



const rootReducer = combineReducers({
    // customerAuth : authCustomerReducer,
    // sellerAuth : authSellerReducer,
    userAuth : authUserReducer
});



export default rootReducer