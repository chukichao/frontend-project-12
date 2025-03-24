import { Link } from 'react-router-dom';
import { isUserAuth } from '../utils/userUtils';

const Header = () => {
  const logout = isUserAuth() ? (
    <button type="button" className="btn btn-primary">
      Выйти
    </button>
  ) : null;

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Hexlet Chat
        </Link>
        {logout}
      </div>
    </nav>
  );
};

export default Header;
