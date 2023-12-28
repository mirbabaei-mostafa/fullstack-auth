import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

const initialState: AuthState = {
  username: '',
  email: '',
  createdAt: '',
  updatedAt: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    removeAuth: (state) => {
      state.username = '';
      state.email = '';
      state.createdAt = '';
      state.updatedAt = '';
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
