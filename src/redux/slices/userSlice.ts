// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  user: null, // You can initialize this with the user data you fetch or null
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export the reducer and actions
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
