import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

const userNameSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    clearUserName: () => ({ userName: "" }),
  },
});

export const { setUserName, clearUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
