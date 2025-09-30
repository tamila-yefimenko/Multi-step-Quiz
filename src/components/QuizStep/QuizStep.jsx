import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentStep,
  selectSteps,
  selectAnswers,
  selectIsLoaded,
} from "../../redux/quiz/selectors";
import {
  submitAnswer,
  nextStep,
  previousStep,
} from "../../redux/quiz/quizSlice";
import { fetchSteps } from "../../redux/quiz/operations";
import { useNavigate } from "react-router-dom";

function QuizStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentStep = useSelector(selectCurrentStep);
  const steps = useSelector(selectSteps);
  const answers = useSelector(selectAnswers);
  const isLoaded = useSelector(selectIsLoaded);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchSteps());
    }
  }, [dispatch, isLoaded]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [currentStep]);

  if (!isLoaded || steps.length === 0) {
    return <p>Завантаження кроків...</p>;
  }

  const step = steps[currentStep];
  const questions = step?.questions;

  if (!step || !questions?.length) {
    return <p>Крок не знайдено або не має питань.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionId = currentQuestion.sys?.id;
  const questionType = currentQuestion.fields?.questionType;
  const questionText = currentQuestion.fields?.questionText;
  const possibleAnswers = currentQuestion.fields?.possibleAnswers;

  const currentAnswer =
    answers.find((a) => a.questionId === questionId)?.value || "";

  const handleAnswer = (questionId, value) => {
    dispatch(submitAnswer({ questionId, value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      dispatch(nextStep());
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    } else {
      dispatch(previousStep());
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-step">
      <h2>
        Крок {currentStep + 1}: {step.title}
      </h2>

      <div key={questionId} className="question-block">
        <p>{questionText}</p>

        {(questionType === "multiple_choice" || questionType === "scale") && (
          <div className="options">
            {possibleAnswers?.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={questionId}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={() => handleAnswer(questionId, option)}
                />
                {option}
              </label>
            ))}
          </div>
        )}

        {questionType === "open_ended" && (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleAnswer(questionId, e.target.value)}
          />
        )}
      </div>

      <div className="navigation-buttons">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentStep === 0 && currentQuestionIndex === 0}>
          Назад
        </button>

        {isLastStep && isLastQuestion ? (
          <button onClick={() => navigate("/result")}>Завершити</button>
        ) : (
          <button onClick={handleNextQuestion}>Далі</button>
        )}
      </div>
    </div>
  );
}

export default QuizStep;
