import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainPage from '../pages/MainPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import Chat from './Chat.jsx';

const AppRouter = () => {
  const token = useSelector((state) => state.auth.token);

  const redirect = token ? (
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
