import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { setLocale } from 'yup';

import { Formik, Form as FormFormik, Field } from 'formik';

import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import signupImg from '../assets/signup.jpg';

import UserService from '../API/UserService';
import { authActions } from '../store/actions';

const SignupPage = () => {
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { username, password } = values;

      const newUser = {
        username,
        password,
      };

      const response = await UserService.createNewUser(newUser);
      dispatch(authActions.setAuth(response.data));

      navigate('/');
    } catch (error) {
      if (error?.response.data.statusCode === 409) {
        setIsError(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  setLocale({
    string: {
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
    },
    mixed: {
      required: 'Обязательное поле',
    },
  });

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .required()
      .test(
        'confirmPassword',
        (value, ctx) => value === ctx.from[ctx.from.length - 1].value.password,
      ),
  });

  const errorMessagePassword = (
    <Form.Control.Feedback type="invalid" tooltip>
      Пароли должны совпадать
    </Form.Control.Feedback>
  );

  const errorMessageAuth = (
    <Form.Control.Feedback type="invalid" tooltip>
      Такой пользователь уже существует
    </Form.Control.Feedback>
  );

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img src={signupImg} className="rounded-circle" alt="Регистрация" />
        </div>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <FormFormik className="w-50" noValidate>
              <h1 className="text-center mb-4">Регистрация</h1>
              <FloatingLabel
                className="mb-3"
                controlId="username"
                label="Имя пользователя"
              >
                <Field
                  name="username"
                  autoComplete="username"
                  required
                  id="username"
                  placeholder="От 3 до 20 символов"
                  innerRef={inputRef}
                  className={`form-control ${
                    (touched.username && errors.username) || isError
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="password"
                label="Пароль"
              >
                <Field
                  type="password"
                  name="password"
                  aria-describedby="passwordHelpBlock"
                  autoComplete="new-password"
                  required
                  id="password"
                  placeholder="Не менее 6 символов"
                  className={`form-control ${
                    (touched.password && errors.password) || isError
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                className="mb-4"
                controlId="confirmPassword"
                label="Подтвердите пароль"
              >
                <Field
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  id="confirmPassword"
                  placeholder="Пароли должны совпадать"
                  className={`form-control ${
                    (touched.confirmPassword && errors.confirmPassword) ||
                    isError
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                {isError && errorMessageAuth}
                {errors.confirmPassword ? errorMessagePassword : null}
              </FloatingLabel>
              <Button type="submit" variant="outline-primary" className="w-100">
                Зарегистрироваться
              </Button>
            </FormFormik>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default SignupPage;
