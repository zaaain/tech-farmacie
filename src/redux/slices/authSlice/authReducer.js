import { createSlice } from "@reduxjs/toolkit";
import { getProfile,} from "./authAction";

// Initial state
const initialState = {
  profileData: {
  },
  token:"",
  profileLoader: false
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAuth: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    //Get Profile
    builder.addCase(getProfile.pending, (state) => {
      state.profileLoader = true;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.profileLoader = false;
      state.profileData = payload.data
    });
    builder.addCase(getProfile.rejected, (state, { payload }) => {
      state.profileLoader = false;
    });
  },
});

export const { logoutAuth } = authSlice.actions;
export default authSlice.reducer;
