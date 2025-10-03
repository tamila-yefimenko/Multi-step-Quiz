import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setUserName } from "../../redux/userName/userNameSlice";
import { useEffect } from "react";
import { resetQuiz } from "../../redux/quiz/quizSlice";
import Button from "../../components/Button/Button";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetQuiz());
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto gap-5 bg-white rounded-2xl shadow-2xl p-6 space-y-5 min-h-[50vh] flex flex-col justify-around items-center">
      <h1 className="text-4xl font-bold mt-0 text-orange-500 text-center">
        Welcome to our quiz!
      </h1>
      <img src="/home.png" alt="Welcome quiz" className="w-48 m-0" />
      <p className="text-xl text-gray-700 text-center">
        Follow a few steps to get a personalized result.
      </p>

      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string().min(2, "Min 2 symbols").required("Required field"),
        })}
        onSubmit={(values) => {
          dispatch(setUserName(values.name));
          navigate("/quiz");
        }}>
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col gap-4 w-full max-w-md">
            <label htmlFor="name" className="font-medium text-gray-700">
              Enter your name:
            </label>
            <Field
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 bg-gray-100 rounded-lg p-3 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
            <div
              className={`text-red-500 text-sm min-h-[1.25rem] transition-all duration-300 ease-in-out ${
                errors.name && touched.name
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1"
              }`}>
              <ErrorMessage name="name" />
            </div>

            <Button type="submit" disabled={!(isValid && dirty)}>
              Start the test
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
