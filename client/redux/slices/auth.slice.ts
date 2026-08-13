import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// authState

// const initialState = {
//   user: null |,
// };

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    // after initial enter
    initializeUser: (state, action: PayloadAction) => {
      state.user = action.payload;
      state.loading = false;
    },
    // after changes
    setUser: (state, action: PayloadAction) => {
      state.user = action.payload;
      state.loading = false;
    },
    // after logout
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { initializeUser, setUser, clearUser } = authSlice.actions;
