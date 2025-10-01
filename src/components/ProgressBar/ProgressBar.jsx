import { useSelector } from "react-redux";

function ProgressBar() {
  const { currentStep, steps, answers } = useSelector((state) => state.quiz);

  const totalQuestions = steps.reduce((total, step) => {
    return total + (step.questions?.length || 0);
  }, 0);

  const answeredCount =
    answers?.filter((a) => a.value && a.value.trim() !== "").length || 0;

  const questionsBeforeCurrentStep = steps
    .slice(0, currentStep)
    .reduce((total, step) => total + (step.questions?.length || 0), 0);

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex || 0
  );

  const currentQuestionNumber =
    questionsBeforeCurrentStep + currentQuestionIndex + 1;

  const progressPercent = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        Question {currentQuestionNumber} of {totalQuestions}
      </div>
      <div className="mb-1 text-sm text-gray-500">
        Answered {answeredCount} of {totalQuestions} questions
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
