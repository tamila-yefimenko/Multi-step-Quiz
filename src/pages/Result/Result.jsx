import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetQuiz } from "../../redux/quiz/quizSlice";
import { clearUserName } from "../../redux/userName/userNameSlice";
import { selectUserName } from "../../redux/userName/selectors";
import QuizResult from "../../components/QuizResult/QuizResult";

const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector(selectUserName);

  const handleRestart = () => {
    dispatch(resetQuiz());
    dispatch(clearUserName());
    navigate("/quiz");
  };

  return (
    <div className="result-page">
      <h1>Results</h1>
      {userName && <h2>Thanks, {userName}!</h2>}

      <QuizResult />

      <button
        className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
        onClick={handleRestart}>
        Take the test again
      </button>
    </div>
  );
};

export default Result;
