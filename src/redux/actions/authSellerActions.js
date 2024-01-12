export const SELLER_LOGIN = 'SELLER_LOGIN';
export const SELLER_LOGOUT = 'SELLER_LOGOUT';
export const SELLER_CREDENTIAL = "SELLER_CREDENTIAL"
export const SELLER_NOTIFICATION = "SELLER_NOTIFICATION"
export const SELLER_NOTIFICATION_SINGLE = "SELLER_NOTIFICATION_SINGLE"
export const SELLER_NOTIFICATION_SIGNAL = "NOTIFICATION_SIGNAL"



export const sellerNotificationSignal = () => ({
  type: SELLER_NOTIFICATION_SIGNAL

})

export const sellerLogin = () => ({
    type: SELLER_LOGIN,
  });
  
  export const sellerLogout = () => ({
    type: SELLER_LOGOUT,
  });

  export const sellerCredentials = (userName, userId) => ({
      type: SELLER_CREDENTIAL,
      name: userName,
      id: userId
  })

  export const sellerNotification = (notification) => ({
    type: SELLER_NOTIFICATION_SINGLE,
    notification: notification
  })
  
  export const sellerNotifications = (notification = []) => ({
    type: SELLER_NOTIFICATION,
    notification: notification
  })