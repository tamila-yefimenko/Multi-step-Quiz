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
    return <p>Loading steps...</p>;
  }

  const step = steps[currentStep];
  const questions = step?.questions;

  if (!step || !questions?.length) {
    return <p>Step not found or has no questions.</p>;
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
    <div>
      <h2>
        Step {currentStep + 1}: {step.title}
      </h2>

      <div key={questionId} className="space-y-4 py-5">
        <p className="text-xl font-semibold">{questionText}</p>

        {(questionType === "multiple_choice" || questionType === "scale") && (
          <div className="flex flex-col gap-3">
            {possibleAnswers?.map((option) => (
              <label
                key={option}
                className={`p-3 border rounded-lg cursor-pointer transition 
            ${
              currentAnswer === option
                ? "bg-orange-100 border-orange-400"
                : "hover:bg-gray-100"
            }`}>
                <input
                  type="radio"
                  name={questionId}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={() => handleAnswer(questionId, option)}
                  className="hidden"
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
            className="w-full p-2 border rounded-lg"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        {!(currentStep === 0 && currentQuestionIndex === 0) ? (
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={handlePreviousQuestion}>
            Go back
          </button>
        ) : (
          <div />
        )}

        {isLastStep && isLastQuestion ? (
          <button
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => navigate("/result")}>
            Finish
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizStep;
