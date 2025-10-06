import { useSelector, useDispatch } from "react-redux";
import {
  selectSteps,
  selectAnswers,
  selectIsLoading,
} from "../../redux/quiz/selectors";
import { selectUserName } from "../../redux/userName/selectors";
import { useEffect, useState } from "react";
import { client } from "../../services/algolia";
import Loader from "../Loader/Loader";
import { setCurrentResult, markSaved } from "../../redux/results/resultsSlice";

function QuizResult() {
  const dispatch = useDispatch();
  const steps = useSelector(selectSteps);
  const answers = useSelector(selectAnswers);
  const isLoading = useSelector(selectIsLoading);
  const userName = useSelector(selectUserName);
  const [hasSaved, setHasSaved] = useState(false);

  const correctCount = steps.reduce((sum, step) => {
    return (
      sum +
      step.questions.filter((q) => {
        const userAnswer = answers.find(
          (a) => a.questionId === q.sys.id
        )?.value;

        return (
          Boolean(userAnswer) &&
          userAnswer.toLowerCase() === q.fields.correctAnswer.toLowerCase()
        );
      }).length
    );
  }, 0);

  const totalQuestions = steps.reduce(
    (sum, step) => sum + step.questions.length,
    0
  );

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    if (!isLoading && steps.length > 0 && !hasSaved) {
      const result = {
        objectID: userName || "anonymous",
        userName: userName || "Anonymous",
        score: correctCount,
        totalQuestions,
        percentage,
        answers,
        createdAt: Date.now(),
      };

      dispatch(setCurrentResult(result));

      client
        .saveObject({
          indexName: "quiz_results",
          body: result,
        })
        .then(() => {
          setHasSaved(true);
          dispatch(markSaved());
        })
        .catch((err) => {
          console.error("Error saving to Algolia:", err);
        });
    }
  }, [
    isLoading,
    steps,
    hasSaved,
    userName,
    correctCount,
    totalQuestions,
    percentage,
    answers,
    dispatch,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-inner space-y-4 w-full">
      <h2 className="text-xl font-semibold text-gray-800">
        {correctCount === 0 ? (
          <>
            😅 Don't worry! Your result:{" "}
            <span className="text-red-600 font-bold">0 / {totalQuestions}</span>{" "}
            ({percentage}%)
          </>
        ) : (
          <>
            Your score:{" "}
            <span className="text-orange-600 font-bold">
              {correctCount} / {totalQuestions}
            </span>{" "}
            ({percentage}%)
          </>
        )}
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-orange-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {percentage === 100 && (
        <p className="text-green-600 font-medium">
          🎉 Perfect! You answered all questions correctly!
        </p>
      )}
      {percentage >= 70 && percentage < 100 && (
        <p className="text-blue-600 font-medium">
          👍 Great job! You did really well!
        </p>
      )}
      {percentage < 70 && (
        <p className="text-red-600 font-medium">
          💡 Keep practicing! You can improve next time.
        </p>
      )}
    </div>
  );
}

export default QuizResult;
