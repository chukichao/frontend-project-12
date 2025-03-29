import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Header from '../components/Header.jsx';
import ModalUI from '../components/UI/Modal.jsx';

import ModalAddChannel from '../components/ModalAddChannel.jsx';
import ModalRemoveChannel from '../components/ModalRemoveChannel.jsx';
import ModalRenameChannel from '../components/ModalRenameChannel.jsx';

import { getModal } from '../store/selectors';

const MainPage = () => {
  const modal = useSelector(getModal);
  const { t } = useTranslation();

  const titleModal = {
    addChannel: t('modals.add'),
    removeChannel: t('modals.remove'),
    renameChannel: t('modals.rename'),
  };

  const bodyModal = {
    addChannel: <ModalAddChannel />,
    removeChannel: <ModalRemoveChannel />,
    renameChannel: <ModalRenameChannel />,
  };

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Outlet />
      {modal.isOpened && (
        <ModalUI title={titleModal[modal.type]}>
          {bodyModal[modal.type]}
        </ModalUI>
      )}
    </div>
  );
};

export default MainPage;
