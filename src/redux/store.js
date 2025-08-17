import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quiz/quizSlice";
import userReducer from "./userName/userNameSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
  },
});
