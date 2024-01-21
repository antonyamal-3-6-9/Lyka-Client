import { LOGIN, LOGOUT, CREDENTIAL, NOTIFICATION_SINGLE, NOTIFICATION, NOTIFICATION_SIGNAL } from "../actions/authUserActions";
import { DISABLE_SOCKET, ENABLE_SOCKET, BUSINESS_NAME_SET } from "../actions/authUserActions";


const initialState = {
    isLoggedIn: null,
    name: "",
    id: "",
    role: "",
    Notifications: [{}],
    notificationSignal: false,
    socket: null,
    businessName: ""
  };
  
  const authUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          isLoggedIn: true,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
        };
      case CREDENTIAL:
        return {
          ...state,
          name: action.name,
          id: action.id,
          role: action.role
        }
      case NOTIFICATION_SINGLE:
        const updatedStateSmall = [...state.Notifications]
        updatedStateSmall.push(action.notification)
        console.log(state)
        return {
          ...state,
          Notifications: updatedStateSmall
        }
      case NOTIFICATION:
        const updatedState = [...state.Notifications]
        updatedState.push(...action.notification)
        return {
          ...state,
          Notifications: updatedState
        }

      case NOTIFICATION_SIGNAL:
        return {
          ...state,
          notificationSignal: !state.notificationSignal
        }
      case ENABLE_SOCKET:
        return {
          ...state,
          socket: action.socketRoot
        }
      case DISABLE_SOCKET:
      return {
        ...state,
        socket: null
      }
      case BUSINESS_NAME_SET:
        return {
          ...state,
          businessName: action.name
        }
      default:
        return state;
    }
  };
  
  export default authUserReducer;
  