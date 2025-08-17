import { createSlice } from "@reduxjs/toolkit";
import { setUserName } from "./operations";

const initialState = {
  userName: "",
};

const userNameSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserName: (state) => (state.userName = ""),
  },
  extraReducers: (builder) => {
    builder.addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    });
  },
});

export const { clearUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
