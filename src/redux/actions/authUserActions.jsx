import axios from "axios";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CREDENTIAL = "CREDENTIAL";
export const NOTIFICATION = "NOTIFICATION";
export const NOTIFICATION_SINGLE = "NOTIFICATION_SINGLE";
export const NOTIFICATION_SIGNAL = "NOTIFICATION_SIGNAL";
export const ENABLE_SOCKET = "ENABLE_SOCKET";
export const DISABLE_SOCKET = "DISABLE_SOCKET";

export const enableSocket = (socketRoot) => ({
  type: ENABLE_SOCKET,
  root: socketRoot,
});

export const disableSocket = () => ({
  type: DISABLE_SOCKET,
});

export const NotificationSignal = () => ({
  type: NOTIFICATION_SIGNAL,
});

export const Login = () => ({
  type: LOGIN,
});

export const Logout = () => ({
  type: LOGOUT,
});

export const Credentials = (userName, userId, userRole) => ({
  type: CREDENTIAL,
  name: userName,
  id: userId,
  role: userRole,
});

export const Notification = (notification) => ({
  type: NOTIFICATION_SINGLE,
  notification: notification,
});

export const Notifications = (notification = []) => ({
  type: NOTIFICATION,
  notification: notification,
});

export const WebSocketConnect = (userId) => {
  return async (dispatch) => {
    try {
      const webSocket = new WebSocket(
        `ws://localhost:8000/ws/notification/private/${userId}/`
      );
      dispatch(enableSocket(webSocket));
      if (webSocket.OPEN) {
        webSocket.onmessage((message) => {
          console.log(message)
          const messageJson = JSON.parse(message);
          dispatch(Notification(messageJson.data));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const getNotification = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const notificationResponse = await axios.get(
        `http://localhost:8000/owner/notification/`,
        {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(Notifications(notificationResponse.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const initialAction = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const isActiveResponse = await axios.get(
        `http://localhost:8000/owner/active/`,
        {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (isActiveResponse.status === 200) {
        dispatch(getNotification());
        console.log(isActiveResponse);
        dispatch(Login());
        dispatch(
          Credentials(
            isActiveResponse.data.user.name,
            isActiveResponse.data.user.id,
            isActiveResponse.data.user.role
          )
        );
        dispatch(WebSocketConnect(isActiveResponse.data.user.id));
      }
    } catch (error) {
      console.log("user is not logged in");
    }
  };
};

export const WebSocketDisconnect = () => {
  return (dispatch, getState) => {
    const { socket } = getState();
    socket.onclose(() => {
      console.log("Socket is being closed");
      dispatch(disableSocket());
    });
  };
};

export const flushNotification = () => {
  return (dispatch) => {
    dispatch(Notifications([]));
  };
};

export const logOutAction = () => {
  return (dispatch) => {
    dispatch(WebSocketDisconnect());
    dispatch(flushNotification());
  };
};
