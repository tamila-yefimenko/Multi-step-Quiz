import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setUserName } from "../../redux/userName/operations";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="text-xl font-medium text-blue-500">
        Welcome to our quiz!
      </h1>
      <p>Follow a few steps to get a personalized result.</p>

      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string().min(2, "Min 2 symbols").required("Required field"),
        })}
        onSubmit={(values) => {
          dispatch(setUserName(values.name));
          navigate("/quiz");
        }}>
        {({ isValid, dirty }) => (
          <Form className="name-form">
            <label htmlFor="name">Enter your name:</label>
            <Field name="name" type="text" placeholder="Your name" />
            <ErrorMessage name="name" component="div" className="error" />

            <button
              type="submit"
              className="start-button"
              disabled={!(isValid && dirty)}>
              Start the test
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
