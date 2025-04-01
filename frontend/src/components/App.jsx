import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import io from 'socket.io-client';

import {
  getToken,
  getDefaultChannelId,
  getCurrentChannelId,
} from '../store/selectors';
import { uiActions } from '../store/actions';
import { getChannels, getMessages } from '../store/asyncActions';

import '../assets/application.scss';

import AppRouter from './AppRouter.jsx';

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const currentChannelId = useSelector(getCurrentChannelId);
  const defaultChannelId = useSelector(getDefaultChannelId);

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', () => {
      dispatch(getMessages(token));
    });

    socket.on('newChannel', () => {
      dispatch(getChannels(token));
    });

    socket.on('renameChannel', () => {
      dispatch(getChannels(token));
    });

    socket.on('removeChannel', ({ id }) => {
      if (currentChannelId === id) {
        dispatch(uiActions.setCurrentChannel({ id: defaultChannelId }));
      }

      dispatch(getChannels(token));
      dispatch(getMessages(token));
    });

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
