export const selectCurrentStep = (state) => state.quiz.currentStep;
export const selectSteps = (state) => state.quiz.steps;
export const selectAnswers = (state) => state.quiz.answers;
export const selectIsLoading = (state) => state.quiz.isLoading;
export const selectError = (state) => state.quiz.error;
export const selectCurrentQuestionIndex = (state) =>
  state.quiz.currentQuestionIndex;

export const selectCurrentQuestion = (state) => {
  const step = state.quiz.steps[state.quiz.currentStep];
  if (!step || !step.questions) return null;
  return step.questions[0] || null;
};
