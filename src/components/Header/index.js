import React, { useContext } from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Context } from '../../Context/AuthContext';

import { Nav, Container } from './styled';

export default function Header() {
  const { authenticated, handleLogout } = useContext(Context);

  return (
    <Nav>
      <Container>
        <Link to="/">
          <span>
            <p>Página Inicial</p> <FaHome size={24} />
          </span>
        </Link>
        <Link to="/login">
          <span>
            <p>Login</p> <FaUserAlt size={24} />
          </span>
        </Link>
        {authenticated && (
          <Link to="/" onClick={handleLogout}>
            <span>
              {' '}
              <p>Logout</p> <FaSignInAlt size={24} />
            </span>
          </Link>
        )}
      </Container>
    </Nav>
  );
}
