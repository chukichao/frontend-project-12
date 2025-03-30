import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage.jsx';

import AuthPage from '../pages/AuthPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

import Chat from './Chat.jsx';

import { isUserAuth } from '../utils/userUtils.js';

const AppRouter = () => {
  const redirect = isUserAuth() ? (
    <Route index element={<Chat />} />
  ) : (
    <Route index element={<Navigate to="login" replace />} />
  );

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        {redirect}
        <Route path="login" element={<AuthPage />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="signup" element={<AuthPage />}>
          <Route index element={<SignupPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
