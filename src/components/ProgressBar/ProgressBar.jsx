import { useSelector } from "react-redux";

function ProgressBar() {
  const { steps, answers, currentStep, currentQuestionIndex } = useSelector(
    (state) => state.quiz
  );

  const totalQuestions = steps.reduce(
    (total, step) => total + (step.questions?.length || 0),
    0
  );

  const questionsBeforeCurrentStep = steps
    .slice(0, currentStep)
    .reduce((total, step) => total + (step.questions?.length || 0), 0);

  const currentQuestionNumber =
    questionsBeforeCurrentStep + (currentQuestionIndex + 1);

  const answeredCount =
    answers?.filter((a) => a.value && a.value.trim() !== "").length || 0;

  const progressPercent = (answeredCount / totalQuestions) * 100;

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm text-gray-600 font-medium">
        <span>
          Question {currentQuestionNumber} of {totalQuestions}
        </span>
        <span>
          Answered {answeredCount} of {totalQuestions}
        </span>
      </div>

      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
