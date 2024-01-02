import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  _id: string;
  username: string;
  email: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

const initialState: AuthState = {
  _id: "",
  username: "",
  email: "",
  image: "",
  createdAt: "",
  updatedAt: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    removeAuth: (state) => {
      state._id = "";
      state.username = "";
      state.email = "";
      state.image = "";
      state.createdAt = "";
      state.updatedAt = "";
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
