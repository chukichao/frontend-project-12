import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { isUserAuth } from '../utils/userUtils';

const Header = () => {
  const logout = isUserAuth() ? (
    <button type="button" className="btn btn-primary">
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
