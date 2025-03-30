import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button.js';

import { authActions } from '../store/actions';

import { isUserAuth } from '../utils/userUtils.js';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.removeAuth());
  };

  const logoutButton = isUserAuth() ? (
    <Button onClick={handleLogout}>{t('logout')}</Button>
  ) : null;

  return (
    <Navbar expand="lg" className="shadow-sm navbar bg-white">
      <Container>
        <Link className="navbar-brand" to="/">
          {t('hexletChat')}
        </Link>
        {logoutButton}
      </Container>
    </Navbar>
  );
};

export default Header;
