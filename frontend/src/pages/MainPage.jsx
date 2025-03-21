import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';

const MainPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainPage;
