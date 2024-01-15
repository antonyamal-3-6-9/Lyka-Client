// import { SELLER_LOGIN, SELLER_LOGOUT, SELLER_CREDENTIAL, SELLER_NOTIFICATION, SELLER_NOTIFICATION_SINGLE, SELLER_NOTIFICATION_SIGNAL } from "../actions/authSellerActions";

// const initialState = {
//     isSellerLoggedIn: false,
//     sellerName: "",
//     sellerId: "",
//     sellerNotifications: [{}],
//     sellerNotificationSignal: false
//   };
  
//   const authSellerReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case SELLER_LOGIN:
//         return {
//           ...state,
//           isSellerLoggedIn: true,
//         };
//       case SELLER_LOGOUT:
//         return {
//           ...state,
//           isSellerLoggedIn: false,
//         };
//         case SELLER_CREDENTIAL:
//           return {
//             ...state,
//             sellerName: action.name,
//             sellerId: action.id
//           }
//         case SELLER_NOTIFICATION_SINGLE:
//           const updatedStateSmall = [...state.sellerNotifications]
//           updatedStateSmall.push(action.notification)
//           console.log(state)
//           return {
//             ...state,
//             sellerNotifications: updatedStateSmall
//           }
//         case SELLER_NOTIFICATION:
//           const updatedState = [...state.sellerNotifications]
//           updatedState.push(...action.notification)
//           return {
//             ...state,
//             sellerNotifications: updatedState
//           }

//           case SELLER_NOTIFICATION_SIGNAL:
//             return {
//               ...state,
//               sellerNotificationSignal: !state.sellerNotificationSignal
//             }
    
//       default:
//         return state;
//     }
//   };
  
//   export default authSellerReducer;
  