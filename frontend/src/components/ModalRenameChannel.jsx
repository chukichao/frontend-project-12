import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as yup from 'yup';
import { setLocale } from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Formik, Form as FormFormik, Field } from 'formik';

import { useTranslation } from 'react-i18next';

import { getChannels, getToken, getExtra } from '../store/selectors';
import { uiActions } from '../store/actions';
import { editChannel } from '../store/asyncActions';

const ModalRenameChannel = () => {
  const [disabledButton, setDisabledButton] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const token = useSelector(getToken);
  const channelNames = Object.values(useSelector(getChannels)).map(
    (channel) => channel.name,
  );

  const channelId = useSelector(getExtra);
  const currentChannelName = useSelector(getChannels)[channelId].name;

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

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).max(20).notOneOf(channelNames),
  });

  const handleCloseModal = () => {
    dispatch(uiActions.closeModal());
  };

  const handleSubmit = (errors, values) => (event) => {
    event.preventDefault();

    if (errors.name) {
      setError(errors.name);
      return;
    }

    setDisabledButton(true);

    const editedChannel = {
      name: values.name,
    };

    dispatch(editChannel({ token, channelId, editedChannel }));
    handleCloseModal();
  };

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  });

  return (
    <Formik
      initialValues={{ name: currentChannelName }}
      validationSchema={validationSchema}
    >
      {({ errors, values }) => (
        <FormFormik noValidate onSubmit={handleSubmit(errors, values)}>
          <div>
            <Field
              name="name"
              id="name"
              className={`form-control mb-2 ${error ? 'is-invalid' : ''}`}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  return handleSubmit(errors, values);
                }
              }}
              innerRef={inputRef}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="me-2"
              >
                {t('modals.cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={disabledButton}>
                {t('modals.submit')}
              </Button>
            </div>
          </div>
        </FormFormik>
      )}
    </Formik>
  );
};

export default ModalRenameChannel;
