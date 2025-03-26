import { useSelector } from 'react-redux';
import {
  getChannels,
  getCurrentChannelId,
  getUsername,
} from '../store/selectors';

const useCurrentUserInfo = () => {
  const currentUsername = useSelector(getUsername);

  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = useSelector(getChannels);
  const currentChannel = channels[currentChannelId];

  return { currentUsername, currentChannel };
};

export default useCurrentUserInfo;
