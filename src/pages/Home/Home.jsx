import { Link } from "react-router-dom";
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
      <h1>Ласкаво просимо до нашого квізу!</h1>
      <p>Пройдіть кілька кроків, щоби отримати персоналізований результат.</p>

      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Мінімум 2 символи")
            .required("Обовʼязкове поле"),
        })}
        onSubmit={(values) => {
          dispatch(setUserName(values.name));
          navigate("/quiz");
        }}>
        {({ isValid, dirty }) => (
          <Form className="name-form">
            <label htmlFor="name">Введіть ваше ім’я:</label>
            <Field name="name" type="text" placeholder="Ваше ім’я" />
            <ErrorMessage name="name" component="div" className="error" />

            <button
              type="submit"
              className="start-button"
              disabled={!(isValid && dirty)}>
              Почати тест
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
