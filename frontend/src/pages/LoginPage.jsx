import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { Formik, Form as FormFormik, Field } from 'formik';

import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import UserService from '../API/UserService.js';
import { authActions } from '../store/actions';

import loginImg from '../assets/login.jpg';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(false);
  const [isError, setIsError] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setDisabledButton(true);

      const { username, password } = values;
      const user = {
        username,
        password,
      };

      const response = await UserService.login(user);
      dispatch(authActions.setAuth(response.data));

      navigate('/');
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setSubmitting(false);
      setDisabledButton(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={loginImg}
            className="rounded-circle"
            alt={t('login.header')}
          />
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <FormFormik className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">{t('login.header')}</h1>

            <FloatingLabel
              className="mb-3"
              controlId="username"
              label={t('login.username')}
            >
              <Field
                name="username"
                autoComplete="username"
                required
                id="username"
                placeholder={t('login.username')}
                className={`form-control ${isError ? 'is-invalid' : ''}`}
                innerRef={inputRef}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-4"
              controlId="password"
              label={t('login.password')}
            >
              <Field
                type="password"
                name="password"
                autoComplete="current-password"
                required
                id="password"
                placeholder={t('login.password')}
                className={`form-control ${isError ? 'is-invalid' : ''}`}
              />
              {isError && (
                <div className="invalid-tooltip">{t('login.authFailed')}</div>
              )}
            </FloatingLabel>

            <Button
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3"
              disabled={disabledButton}
            >
              {t('login.submit')}
            </Button>
          </FormFormik>
        </Formik>
      </Card.Body>

      <Card.Footer className="p-4">
        <div className="text-center">
          <span>{t('login.newToChat')}</span>
          {'\u00A0'}
          <Link to="/signup">{t('login.signup')}</Link>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Login;
