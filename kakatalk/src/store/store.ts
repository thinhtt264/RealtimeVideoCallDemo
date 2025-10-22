import { configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistStore, REHYDRATE } from 'redux-persist';
import { combineReducers } from 'redux';
import persistedAuthReducer from './slices/authSlice';
import persistedAppReducer from './slices/appSlice';

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  app: persistedAppReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }),
  devTools: __DEV__,
});

export default store;

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
