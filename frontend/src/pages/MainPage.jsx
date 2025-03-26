import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header.jsx';
import ModalAddChannel from '../components/ModalAddChannel.jsx';
import { getModal } from '../store/selectors/index.js';

const MainPage = () => {
  const modal = useSelector(getModal);

  const modalType = {
    addChannel: <ModalAddChannel />,
  };

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Outlet />
      {modal.isOpened && modalType[modal.type]}
    </div>
  );
};

export default MainPage;
