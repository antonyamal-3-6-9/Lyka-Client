export const CUSTOMER_LOGIN = 'CUSTOMER_LOGIN';
export const CUSTOMER_LOGOUT = 'CUSTOMER_LOGOUT';

export const customerLogin = () => ({
  type: CUSTOMER_LOGIN,
});

export const customerLogout = () => ({
  type: CUSTOMER_LOGOUT,
});
