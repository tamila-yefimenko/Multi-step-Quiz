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
    return <p>Loadind your results...</p>;
  }

  const correctCount = steps.reduce((sum, step) => {
    return (
      sum +
      step.questions.filter((q) => {
        const userAnswer = answers.find(
          (a) => a.questionId === q.sys.id
        )?.value;
        return userAnswer === q.fields.correctAnswer;
      }).length
    );
  }, 0);

  const totalQuestions = steps.reduce(
    (sum, step) => sum + step.questions.length,
    0
  );

  const getAnswerStatus = (question) => {
    const userAnswer = answers.find(
      (a) => a.questionId === question.sys.id
    )?.value;
    if (!userAnswer) return { text: "No answer", color: "gray" };
    return userAnswer === question.fields.correctAnswer
      ? { text: "✔️ Correct", color: "green" }
      : { text: "❌ Incorrect", color: "#c0392b" };
  };

  return (
    <div className="quiz-result">
      <h2>
        Your result: {correctCount} / {totalQuestions} (
        {Math.round((correctCount / totalQuestions) * 100)}%)
      </h2>

      {steps.map((step) => (
        <div key={step.id} className="step-result">
          <h3>{step.title}</h3>
          {step.questions.map((q) => {
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
          })}
        </div>
      ))}
    </div>
  );
}

export default QuizResult;
