import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../actions/authCustomerActions";


const initialState = {
    isCustomerLoggedIn: false,
  };
  
  const authCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
      case CUSTOMER_LOGIN:
        return {
          ...state,
          isCustomerLoggedIn: true,
        };
      case CUSTOMER_LOGOUT:
        return {
          ...state,
          isCustomerLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default authCustomerReducer;
  