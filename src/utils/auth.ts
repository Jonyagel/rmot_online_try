// src/utils/auth.ts
import Cookies from 'js-cookie';

export const saveAuthToken = (token: string, user: any) => {
  // שמירה בלוקל סטורג'
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  
  // שמירה בקוקיז - יפוג בעוד 7 ימים
  Cookies.set('token', token, { expires: 30, secure: true, sameSite: 'strict' });
  Cookies.set('user', JSON.stringify(user), { expires: 30, secure: true, sameSite: 'strict' });
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  Cookies.remove('token');
  Cookies.remove('user');
};