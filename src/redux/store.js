import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quiz/quizSlice";
import userReducer from "./userName/userNameSlice";
import resultsReducer from "./results/resultsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const quizPersistConfig = {
  key: "quiz",
  version: 1,
  storage,
};

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    quiz: persistReducer(quizPersistConfig, quizReducer),
    user: persistReducer(userPersistConfig, userReducer),
    results: resultsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
