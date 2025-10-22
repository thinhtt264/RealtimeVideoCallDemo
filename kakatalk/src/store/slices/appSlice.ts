import { createSlice } from '@reduxjs/toolkit';
import { MMKVStorage } from '../mmkvStorage';
import { persistReducer } from 'redux-persist';

interface AppState {
  isFirstLaunch: boolean;
}

const initialState: AppState = {
  isFirstLaunch: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsFirstLaunch: (state, action) => {
      state.isFirstLaunch = action.payload;
    },
  },
});

const persistedAppReducer = persistReducer(
  {
    key: 'app',
    storage: MMKVStorage,
    whitelist: ['isFirstLaunch'],
  },
  appSlice.reducer,
);

export const appActions = appSlice.actions;
export default persistedAppReducer;
