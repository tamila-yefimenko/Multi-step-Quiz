import { createSlice } from "@reduxjs/toolkit";
import { fetchSteps } from "./operations";

const initialState = {
  currentStep: 0,
  steps: [],
  answers: [],
  isLoaded: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
    submitAnswer: (state, action) => {
      const { questionId, value } = action.payload;
      const existing = state.answers.find((a) => a.questionId === questionId);
      if (existing) {
        existing.value = value;
      } else {
        state.answers.push({ questionId, value });
      }
    },
    resetQuiz: (state) => {
      state.currentStep = 0;
      state.steps = [];
      state.answers = [];
      state.isLoaded = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.steps = action.payload;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchSteps.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.steps = [];
        state.isLoaded = false;
        state.error = action.payload;
      });
  },
});

export const { nextStep, previousStep, submitAnswer, resetQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
