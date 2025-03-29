import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';

import { useTranslation } from 'react-i18next';

import { uiActions } from '../store/actions';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemove = () => {};

  const handleCloseAddChannel = () => {
    dispatch(uiActions.closeModal());
  };

  return (
    <>
      <p className="lead">{t('modals.confirmation')}</p>
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          onClick={handleCloseAddChannel}
          className="me-2"
        >
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          {t('modals.confirm')}
        </Button>
      </div>
    </>
  );
};

export default ModalRemoveChannel;
