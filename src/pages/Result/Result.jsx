import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetQuiz } from "../../redux/quiz/quizSlice";
import { selectUserName } from "../../redux/userName/selectors";
import QuizResult from "../../components/QuizResult/QuizResult";
import Button from "../../components/Button/Button";
import { useState } from "react";
import ResultModal from "../../components/ResultModal/ResultModal";
import QuizResultsEvalList from "../../components/QuizResultsEvalList/QuizResultEvalList";
import { selectIsLoading } from "../../redux/quiz/selectors";

const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const isLoading = useSelector(selectIsLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate("/quiz");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6 min-h-[60vh] flex flex-col justify-between items-center text-center">
      <div className="space-y-3 py-4">
        <img
          src="/party-hat_8944501.png"
          alt="Trophy"
          className="w-20  mx-auto animate-bounce"
        />
        <h1 className="text-3xl font-bold text-orange-600">Results</h1>
        {userName && (
          <h2 className="text-lg text-gray-700">Well done, {userName}! 🎉</h2>
        )}
      </div>

      <QuizResult />
      <QuizResultsEvalList />

      <div className="flex w-full justify-between gap-4 mt-6">
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          View detailed results
        </Button>
        <Button variant="primary" onClick={handleRestart}>
          Take the test again
        </Button>
      </div>

      <ResultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Result;
