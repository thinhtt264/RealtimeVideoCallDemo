import Config from 'react-native-config';

export const API_BASE_URL = Config.API_URL;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // User endpoints
  GET_USER_PROFILE: '/users/profile',
  UPDATE_USER_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  UPDATE_AVATAR: '/users/avatar',
  UPDATE_DEVICE_TOKEN: '/users/device-token',

  // Notification endpoints
  GET_NOTIFICATIONS: '/notifications',
  MARK_NOTIFICATION_READ: (id: string) => `/notifications/${id}/read`,
  DELETE_NOTIFICATION: (id: string) => `/notifications/${id}`,

  // Product endpoints
  GET_PRODUCTS: '/products',
  GET_PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT: (id: string) => `/products/${id}`,
  DELETE_PRODUCT: (id: string) => `/products/${id}`,
} as const;
