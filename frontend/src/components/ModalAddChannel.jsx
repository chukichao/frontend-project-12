import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { setLocale } from 'yup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { getChannels, getToken, getModal } from '../store/selectors';
import { addChannel } from '../store/asyncActions';
import { uiActions } from '../store/actions';

const ModalAddChannel = () => {
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState(null);

  const isModalOpen = useSelector(getModal).isOpened;

  const dispatch = useDispatch();

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
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
      },
      mixed: {
        notOneOf: 'Должно быть уникальным',
        required: 'Обязательное поле',
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
    <Modal show={isModalOpen} onHide={handleCloseAddChannel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleCloseAddChannel}
              className="me-2"
            >
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
