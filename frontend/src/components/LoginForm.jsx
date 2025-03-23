import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import userService from '../API/userService.js';
import { actions as authActions } from '../store/slices/auth/authSlice.js';

const LoginForm = () => {
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await userService.login(values);
          dispatch(authActions.setAuth(response.data));
          navigate('/');
        } catch (e) {
          console.error(e);
          setError('Неверные имя пользователя или пароль');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form className="col-12 col-md-6 mt-3 mt-md-0">
        <h1 className="text-center mb-4">Войти</h1>
        <div className="form-floating mb-3">
          <Field
            name="username"
            autoComplete="username"
            required
            placeholder="Ваш ник"
            id="username"
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
          <label htmlFor="username">Ваш ник</label>
        </div>
        <div className="form-floating mb-4">
          <Field
            name="password"
            autoComplete="current-password"
            required
            placeholder="Пароль"
            type="password"
            id="password"
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
          <label className="form-label" htmlFor="password">
            Пароль
          </label>
          {error && <div className="invalid-tooltip">{error}</div>}
        </div>
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
          Войти
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
