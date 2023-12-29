import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import storage from 'redux-persist/lib/storage';
import { Persistor } from 'redux-persist/es/types';

const authPersistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: {
    // rootReducer,
    auth: authReducer,
    // users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
