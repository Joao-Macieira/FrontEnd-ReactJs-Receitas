import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Nav, Container } from './styled';

export default function Header() {
  const token = localStorage.getItem('token');

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
        {token === '' && (
          <Link to="/eu">
            <FaSignInAlt size={24} />
          </Link>
        )}
      </Container>
    </Nav>
  );
}
