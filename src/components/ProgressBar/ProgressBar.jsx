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
    <div className={styles.progressBarWrapper}>
      <div className={styles.progressLabel}>
        Step {currentStep + 1} of {totalSteps}
      </div>
      <div className={styles.progressSubLabel}>
        Answered {answeredCount} of {totalQuestions} questions
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
