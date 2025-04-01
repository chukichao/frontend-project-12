import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getToken } from '../store/selectors';
import { getChannels, getMessages } from '../store/asyncActions';

import ChannelsList from './СhannelsList.jsx';
import MessagesList from './MessagesList.jsx';

const Chat = () => {
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  useEffect(() => {
    dispatch(getChannels(token));
    dispatch(getMessages(token));

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
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
