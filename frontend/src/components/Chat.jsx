import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';

import { getChannels, getMessages } from '../store/asyncActions';
import { getToken } from '../store/selectors';

import ChannelsList from './СhannelsList.jsx';
import MessagesList from './MessagesList.jsx';

const Chat = () => {
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', () => {
      dispatch(getMessages(token));
    });

    socket.on('newChannel', () => {
      dispatch(getChannels(token));
    });

    dispatch(getMessages(token));
    dispatch(getChannels(token));
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList />
        <MessagesList />
      </div>
    </div>
  );
};

export default Chat;
