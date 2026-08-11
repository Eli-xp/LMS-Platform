import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// authState

// const initialState = {
//   user: null |,
// };

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    // after initial enter
    initializeUser: (state, action: PayloadAction) => {
      state.user = action.payload;
    },
    // after changes
    setUser: (state, action: PayloadAction) => {
      state.user = action.payload;
    },
    // after logout
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { initializeUser, setUser, clearUser } = authSlice.actions;
