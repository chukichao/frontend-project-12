import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels, getMessages } from '../store/asyncActions/index.js';
import ChannelsList from './СhannelsList.jsx';
import Messages from './Messages.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getChannels(token));
    dispatch(getMessages(token));
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList />
        <Messages />
      </div>
    </div>
  );
};

export default Chat;
