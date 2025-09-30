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

      <button onClick={handleRestart}>Take the test again</button>
    </div>
  );
};

export default Result;
