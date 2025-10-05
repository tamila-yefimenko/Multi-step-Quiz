import { createSlice } from "@reduxjs/toolkit";
import { fetchSteps } from "./operations";

const initialState = {
  currentStep: 0,
  steps: [],
  currentQuestionIndex: 0,
  answers: [],
  isLoading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
      state.currentQuestionIndex = 0;
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
        const prevStepQuestions =
          state.steps[state.currentStep]?.questions || [];
        state.currentQuestionIndex =
          prevStepQuestions.length > 0 ? prevStepQuestions.length - 1 : 0;
      }
    },
    nextQuestion: (state) => {
      const step = state.steps[state.currentStep];
      if (state.currentQuestionIndex < step.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
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
      state.currentQuestionIndex = 0;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.steps = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSteps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.steps = [];
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch steps";
      });
  },
});

export const {
  nextStep,
  previousStep,
  nextQuestion,
  previousQuestion,
  submitAnswer,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
