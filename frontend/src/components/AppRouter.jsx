import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
