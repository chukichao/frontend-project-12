import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import { uiActions } from '../store/actions';
import { removeChannel } from '../store/asyncActions';
import { getExtra, getToken, getDefaultChannelId } from '../store/selectors';

const ModalRemoveChannel = () => {
  const [disabledButton, setDisabledButton] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);
  const channelId = useSelector(getExtra);
  const defaultChannelId = useSelector(getDefaultChannelId);

  const handleCloseModal = () => {
    dispatch(uiActions.closeModal());
  };

  const handleRemove = () => {
    setDisabledButton(true);

    dispatch(removeChannel({ token, channelId }));
    dispatch(uiActions.setCurrentChannel({ id: defaultChannelId }));

    handleCloseModal();
  };

  return (
    <>
      <p className="lead">{t('modals.confirmation')}</p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={handleCloseModal} className="me-2">
          {t('modals.cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={handleRemove}
          disabled={disabledButton}
        >
          {t('modals.confirm')}
        </Button>
      </div>
    </>
  );
};

export default ModalRemoveChannel;
