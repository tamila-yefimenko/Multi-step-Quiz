import ProgressBar from "../../components/ProgressBar/ProgressBar";
import QuizStep from "../../components/QuizStep/QuizStep";

function Quiz() {
  return (
    <div className="max-w-2xl mx-auto bg-white backdrop-blur-md shadow-lg  rounded-2xl p-6 space-y-5 min-h-[70vh] flex flex-col justify-between">
      <ProgressBar />
      <QuizStep />
    </div>
  );
}

export default Quiz;
