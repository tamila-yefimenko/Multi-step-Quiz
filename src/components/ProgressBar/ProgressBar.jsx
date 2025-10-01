import { useSelector } from "react-redux";
import styles from "./ProgressBar.module.css";

function ProgressBar() {
  const { currentStep, steps, answers } = useSelector((state) => state.quiz);

  const totalSteps = steps.length || 1;

  const totalQuestions = steps.reduce((total, step) => {
    return total + (step.questions?.length || 0);
  }, 0);

  const answeredCount = answers?.length || 0;

  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        Step {currentStep + 1} of {totalSteps}
      </div>
      <div className={styles.progressSubLabel}>
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
