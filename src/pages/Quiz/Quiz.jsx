import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import QuizStep from "../../components/QuizStep/QuizStep";
import {
  selectError,
  selectIsLoading,
  selectSteps,
} from "../../redux/quiz/selectors";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { fetchSteps } from "../../redux/quiz/operations";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Quiz() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const steps = useSelector(selectSteps);

  useEffect(() => {
    if (!steps.length) {
      dispatch(fetchSteps());
    }
  }, [dispatch, steps.length]);

  return (
    <div className="max-w-2xl mx-auto bg-white backdrop-blur-md shadow-lg  rounded-2xl p-6 space-y-5 min-h-[70vh] flex flex-col justify-between">
      <ProgressBar />
      <QuizStep />

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}

export default Quiz;
