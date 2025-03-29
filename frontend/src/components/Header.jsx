import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { isUserAuth } from '../utils/userUtils';
import { authActions } from '../store/actions';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.removeAuth());
  };

  const logout = isUserAuth() ? (
    <button type="button" className="btn btn-primary" onClick={handleLogout}>
      Выйти
    </button>
  ) : null;

  return (
    <Navbar expand="lg" className="shadow-sm navbar bg-white">
      <Container>
        <Link className="navbar-brand" to="/">
          Hexlet Chat
        </Link>
        {logout}
      </Container>
    </Navbar>
  );
};

export default Header;
