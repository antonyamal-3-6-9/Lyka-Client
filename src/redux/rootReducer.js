import { combineReducers } from 'redux';
import authCustomerReducer from './customerAuth/reducers/authCustomerReducer';
import authSellerReducer from './sellerAuth/reducers/authSellerReducers';



const rootReducer = combineReducers({
    customerAuth : authCustomerReducer,
    sellerAuth : authSellerReducer
});



export default rootReducer