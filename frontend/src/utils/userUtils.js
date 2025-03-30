import { useSelector } from 'react-redux';
import { getToken } from '../store/selectors';

export const isUserAuth = () => {
  const token = useSelector(getToken);

  if (token) {
    return true;
  }

  return false;
};
