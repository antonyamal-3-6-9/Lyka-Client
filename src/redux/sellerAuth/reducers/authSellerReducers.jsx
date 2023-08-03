import { SELLER_LOGIN, SELLER_LOGOUT } from "../actions/authSellerActions";

const initialState = {
    isSellerLoggedIn: false,
  };
  
  const authSellerReducer = (state = initialState, action) => {
    switch (action.type) {
      case SELLER_LOGIN:
        return {
          ...state,
          isSellerLoggedIn: true,
        };
      case SELLER_LOGOUT:
        return {
          ...state,
          isSellerLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default authSellerReducer;
  