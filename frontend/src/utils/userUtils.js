import { useSelector } from 'react-redux';

export const isUserAuth = () => {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    return true;
  }

  return false;
};
