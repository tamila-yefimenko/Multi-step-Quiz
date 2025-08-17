import ProgressBar from "../../components/ProgressBar/ProgressBar";
import QuizStep from "../../components/QuizStep/QuizStep";

function Quiz() {
  return (
    <div className="quiz-container">
      <ProgressBar />
      <QuizStep />
    </div>
  );
}

export default Quiz;
