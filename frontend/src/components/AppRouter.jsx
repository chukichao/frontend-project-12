import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
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
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
