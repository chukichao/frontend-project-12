import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { useTranslation } from 'react-i18next';

import useCurrentUserInfo from '../hooks/useCurrentUserInfo.js';

import { addMessage } from '../store/asyncActions';
import { getToken } from '../store/selectors';

const FormAddMessage = () => {
  const [messageBody, setMessageBody] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentUsername, currentChannel } = useCurrentUserInfo();

  const inputRef = useRef();

  const token = useSelector(getToken);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannel]);

  const handleChange = ({ target: { value } }) => {
    setMessageBody(value);

    if (value.trim().length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    setDisabledButton(true);

    const newMessage = {
      body: messageBody,
      channelId: currentChannel.id,
      username: currentUsername,
    };

    dispatch(addMessage({ token, newMessage }));

    setMessageBody('');
    inputRef.current.focus();
  };

  return (
    <Form
      className="py-1 border rounded-2"
      noValidate
      onSubmit={handleSubmitMessage}
    >
      <InputGroup hasValidation>
        <Form.Control
          name="body"
          aria-label={t('chat.newMessage')}
          placeholder={t('chat.message')}
          className="border-0 p-0 ps-2"
          value={messageBody}
          onChange={handleChange}
          ref={inputRef}
        />
        <Button
          type="submit"
          className="btn-group-vertical"
          disabled={disabledButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormAddMessage;
