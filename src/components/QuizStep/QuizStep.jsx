import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentStep,
  selectCurrentQuestionIndex,
  selectSteps,
  selectAnswers,
} from "../../redux/quiz/selectors";
import {
  submitAnswer,
  nextStep,
  previousStep,
  nextQuestion,
  previousQuestion,
} from "../../redux/quiz/quizSlice";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function QuizStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentStep = useSelector(selectCurrentStep);
  const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);
  const steps = useSelector(selectSteps);
  const answers = useSelector(selectAnswers);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }, [currentQuestionIndex, currentStep]);

  if (!steps.length) {
    return null;
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
      dispatch(nextQuestion());
    } else {
      dispatch(nextStep());
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      dispatch(previousQuestion());
    } else if (currentStep > 0) {
      dispatch(previousStep());
    }
  };

  const isFirstQuestion = currentStep === 0 && currentQuestionIndex === 0;
  const isLastStep = currentStep === steps.length - 1;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col min-h-[450px] justify-between">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Step {currentStep + 1}: {step.title}
        </h2>

        <div
          key={questionId}
          className={`space-y-4 p-5 bg-gray-100 rounded-xl shadow-sm min-h-[400px]
            transition-all ease-in-out duration-200 transform ${
              animate ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
            }`}>
          <p className="text-xl font-normal">{questionText}</p>

          {(questionType === "multiple_choice" || questionType === "scale") && (
            <div className="flex flex-col gap-2">
              {possibleAnswers?.map((option) => (
                <label
                  key={option}
                  className={`p-3 bg-white border rounded-lg cursor-pointer transition
                    ${
                      currentAnswer === option
                        ? "bg-orange-50 border-orange-400"
                        : "hover:bg-orange-50"
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
              className="w-full p-3 border rounded-lg bg-white focus:outline-orange-400"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        {!isFirstQuestion ? (
          <Button variant="secondary" onClick={handlePreviousQuestion}>
            Go back
          </Button>
        ) : (
          <div className="w-24" />
        )}

        {isLastStep && isLastQuestion ? (
          <Button onClick={() => navigate("/result")}>Finish</Button>
        ) : (
          <Button onClick={handleNextQuestion}>Next</Button>
        )}
      </div>
    </div>
  );
}

export default QuizStep;
