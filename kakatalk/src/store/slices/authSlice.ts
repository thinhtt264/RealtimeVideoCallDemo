import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import { MMKVStorage } from '../mmkvStorage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: AuthState['user'];
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
  },
});

const persistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage: MMKVStorage,
  blacklist: [],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const authActions = authSlice.actions;
export default persistedAuthReducer;
