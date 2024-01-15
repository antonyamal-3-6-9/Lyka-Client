// import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT, CUSTOMER_CREDENTIAL, CUSTOMER_NOTIFICATION_SINGLE, CUSTOMER_NOTIFICATION, NOTIFICATION_SIGNAL } from "../../actions/authCustomerActions";


// const initialState = {
//     isCustomerLoggedIn: null,
//     customerName: "",
//     customerId: "",
//     customerNotifications: [{}],
//     notificationSignal: false
//   };
  
//   const authCustomerReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case CUSTOMER_LOGIN:
//         return {
//           ...state,
//           isCustomerLoggedIn: true,
//         };
//       case CUSTOMER_LOGOUT:
//         return {
//           ...state,
//           isCustomerLoggedIn: false,
//         };
//       case CUSTOMER_CREDENTIAL:
//         return {
//           ...state,
//           customerName: action.name,
//           customerId: action.id
//         }
//       case CUSTOMER_NOTIFICATION_SINGLE:
//         const updatedStateSmall = [...state.customerNotifications]
//         updatedStateSmall.push(action.notification)
//         console.log(state)
//         return {
//           ...state,
//           customerNotifications: updatedStateSmall
//         }
//       case CUSTOMER_NOTIFICATION:
//         const updatedState = [...state.customerNotifications]
//         updatedState.push(...action.notification)
//         return {
//           ...state,
//           customerNotifications: updatedState
//         }

//       case NOTIFICATION_SIGNAL:
//         return {
//           ...state,
//           notificationSignal: !state.notificationSignal
//         }

//       default:
//         return state;
//     }
//   };
  
//   export default authCustomerReducer;
  