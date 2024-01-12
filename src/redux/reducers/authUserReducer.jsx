import { LOGIN, LOGOUT, CREDENTIAL, NOTIFICATION_SINGLE, NOTIFICATION, NOTIFICATION_SIGNAL } from "../../actions/authUserActions";


const initialState = {
    isLoggedIn: null,
    name: "",
    id: "",
    role: "",
    Notifications: [{}],
    notificationSignal: false
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

      default:
        return state;
    }
  };
  
  export default authUserReducer;
  