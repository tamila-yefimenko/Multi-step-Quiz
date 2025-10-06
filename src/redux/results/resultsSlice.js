import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentResult: null,
  hasSaved: false,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setCurrentResult(state, action) {
      state.currentResult = action.payload;
    },
    markSaved(state) {
      state.hasSaved = true;
    },
  },
});

export const { setCurrentResult, markSaved } = resultsSlice.actions;
export default resultsSlice.reducer;
