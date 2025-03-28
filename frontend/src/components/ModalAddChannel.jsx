import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as yup from 'yup';
import { setLocale } from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useTranslation } from 'react-i18next';

import { getChannels, getToken } from '../store/selectors';

import { addChannel } from '../store/asyncActions';
import { uiActions } from '../store/actions';

const ModalAddChannel = () => {
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState(null);

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

    setLocale({
      string: {
        min: t('modals.min'),
        max: t('modals.max'),
      },
      mixed: {
        notOneOf: t('modals.uniq'),
        required: t('modals.required'),
      },
    });

    const schemaChannelName = yup
      .string()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channelNames);

    try {
      schemaChannelName.validateSync(channelName);

      const channel = {
        name: channelName,
      };

      dispatch(addChannel({ token, channel }));

      handleCloseAddChannel();
    } catch (err) {
      setError(err.message);
    }
  };

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

export default ModalAddChannel;
