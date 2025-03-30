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

import { useTranslation } from 'react-i18next';

import signupImg from '../assets/signup.jpg';

import UserService from '../API/UserService';
import { authActions } from '../store/actions';

const SignupPage = () => {
  const [disabledButton, setDisabledButton] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setDisabledButton(true);
      const { username, password } = values;

      const user = {
        username,
        password,
      };

      const response = await UserService.createNewUser(user);
      dispatch(authActions.setAuth(response.data));

      navigate('/');
    } catch (error) {
      if (error?.response.data.statusCode === 409) {
        console.error(error);
        setIsError(true);
      }
    } finally {
      setSubmitting(false);
      setDisabledButton(false);
    }
  };

  setLocale({
    string: {
      min: t('signup.usernameConstraints'),
      max: t('signup.usernameConstraints'),
    },
    mixed: {
      required: t('signup.required'),
    },
  });

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6, t('signup.passMin')),
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
      {t('signup.mustMatch')}
    </Form.Control.Feedback>
  );

  const errorMessageAuth = (
    <Form.Control.Feedback type="invalid" tooltip>
      {t('signup.alreadyExists')}
    </Form.Control.Feedback>
  );

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img
            src={signupImg}
            className="rounded-circle"
            alt={t('signup.header')}
          />
        </div>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <FormFormik className="w-50" noValidate>
              <h1 className="text-center mb-4">{t('signup.header')}</h1>
              <FloatingLabel
                className="mb-3"
                controlId="username"
                label={t('signup.username')}
              >
                <Field
                  name="username"
                  autoComplete="username"
                  required
                  id="username"
                  placeholder={t('signup.usernameConstraints')}
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
                label={t('signup.password')}
              >
                <Field
                  type="password"
                  name="password"
                  aria-describedby="passwordHelpBlock"
                  autoComplete="new-password"
                  required
                  id="password"
                  placeholder={t('signup.passMin')}
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
                label={t('signup.confirm')}
              >
                <Field
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  id="confirmPassword"
                  placeholder={t('signup.mustMatch')}
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
              <Button
                type="submit"
                variant="outline-primary"
                className="w-100"
                disabled={disabledButton}
              >
                {t('signup.submit')}
              </Button>
            </FormFormik>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default SignupPage;
