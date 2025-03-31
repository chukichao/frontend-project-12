import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import * as yup from 'yup';
import { setLocale } from 'yup';

import { toast } from 'react-toastify';

import { Formik, Form as FormFormik, Field } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { getChannels, getToken, getModal } from '../store/selectors';

import { uiActions } from '../store/actions';
import { editChannel } from '../store/asyncActions';

const ModalRenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getNotificationStatusOperation = () =>
    toast.success(t('channels.renamed'));

  const [disabledButton, setDisabledButton] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef();

  const token = useSelector(getToken);
  const channelNames = Object.values(useSelector(getChannels)).map(
    (channel) => channel.name,
  );

  const channelId = useSelector(getModal).extra;
  const currentChannelName = useSelector(getChannels)[channelId].name;

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  });

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

    const filteredChannelName = filter.clean(values.name);
    const editedChannel = {
      name: filteredChannelName,
    };

    dispatch(editChannel({ token, channelId, editedChannel }));

    handleCloseModal();
    getNotificationStatusOperation();
  };

  return (
    <Formik
      initialValues={{ name: currentChannelName }}
      validationSchema={validationSchema}
    >
      {({ errors, values }) => (
        <FormFormik onSubmit={handleSubmit(errors, values)} noValidate>
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
