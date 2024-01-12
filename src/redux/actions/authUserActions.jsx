export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CREDENTIAL = "CUSTOMER_CREDENTIAL"
export const NOTIFICATION = "CUSTOMER_NOTIFICATION"
export const NOTIFICATION_SINGLE = "CUSTOMER_NOTIFICATION_SINGLE"
export const NOTIFICATION_SIGNAL = "NOTIFICATION_SIGNAL"



export const NotificationSignal = () => ({
  type: NOTIFICATION_SIGNAL

})

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
    role: userRole
})

export const Notification = (notification) => ({
  type: NOTIFICATION_SINGLE,
  notification: notification
})

export const Notifications = (notification = []) => ({
  type: NOTIFICATION,
  notification: notification
})

