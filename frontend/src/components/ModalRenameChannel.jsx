import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as yup from 'yup';
import { setLocale } from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useTranslation } from 'react-i18next';

import { getChannels, getToken, getExtra } from '../store/selectors';

import { uiActions } from '../store/actions';

const ModalRenameChannel = () => {
  const channelId = useSelector(getExtra);
  const currentChannelName = useSelector(getChannels)[channelId].name;

  const [channelName, setChannelName] = useState(currentChannelName);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);
  const channelNames = Object.values(useSelector(getChannels)).map(
    (channel) => channel.name,
  );

  const handleChange = ({ target: { value } }) => {
    setChannelName(value);
  };

  const handleCloseAddChannel = () => {
    dispatch(uiActions.closeModal());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Form.Group>
          <Form.Control
            name="name"
            id="name"
            className={`mb-2 ${error ? 'is-invalid' : ''}`}
            value={channelName}
            onChange={handleChange}
            onKeyDown={(event) => event.key === 'Enter' && handleSubmit}
            autoFocus
            ref={inputRef}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            onClick={handleCloseAddChannel}
            className="me-2"
          >
            {t('modals.cancel')}
          </Button>
          <Button type="submit" variant="primary">
            {t('modals.submit')}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ModalRenameChannel;
