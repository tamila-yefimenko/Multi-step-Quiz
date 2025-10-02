import { useSelector } from "react-redux";
import {
  selectSteps,
  selectAnswers,
  selectIsLoaded,
} from "../../redux/quiz/selectors";

function QuizResult() {
  const steps = useSelector(selectSteps);
  const answers = useSelector(selectAnswers);
  const isLoaded = useSelector(selectIsLoaded);

  if (!isLoaded) {
    return <p className="text-gray-500">Loadind your results...</p>;
  }

  const correctCount = steps.reduce((sum, step) => {
    return (
      sum +
      step.questions.filter((q) => {
        const userAnswer = answers.find(
          (a) => a.questionId === q.sys.id
        )?.value;

        return Boolean(userAnswer) && userAnswer === q.fields.correctAnswer;
      }).length
    );
  }, 0);

  const totalQuestions = steps.reduce(
    (sum, step) => sum + step.questions.length,
    0
  );

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // const getAnswerStatus = (question) => {
  //   const userAnswer = answers.find(
  //     (a) => a.questionId === question.sys.id
  //   )?.value;
  //   if (!userAnswer) return { text: "No answer", color: "gray" };
  //   return userAnswer === question.fields.correctAnswer
  //     ? { text: "✔️ Correct", color: "green" }
  //     : { text: "❌ Incorrect", color: "#c0392b" };
  // };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-inner space-y-4 w-full">
      <h2 className="text-xl font-semibold text-gray-800">
        Your score:{" "}
        <span className="text-orange-600 font-bold">
          {correctCount} / {totalQuestions}
        </span>{" "}
        ({percentage}%)
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
      {/* <h3>{step.title}</h3> */}
      {/* {step.questions.map((q) => {
            const userAnswer = answers.find(
              (a) => a.questionId === q.sys.id
            )?.value;
            const status = getAnswerStatus(q);

            return (
              <div key={q.sys.id} className="question-result">
                <p>
                  <strong>Question:</strong> {q.fields.questionText}
                </p>
                <p>
                  <strong>Your answer:</strong> {userAnswer || "—"}
                </p>
                <p>
                  <strong>Correct answer:</strong> {q.fields.correctAnswer}
                </p>
                <p style={{ color: status.color, fontWeight: "bold" }}>
                  {status.text}
                </p>
              </div>
            );
          })} */}
      {/* </div> */}
      {/* ))} */}
    </div>
  );
}

export default QuizResult;
