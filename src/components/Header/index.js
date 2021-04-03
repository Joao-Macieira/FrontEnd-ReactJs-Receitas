import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Nav, Container } from './styled';

export default function Header() {
  return (
    <Nav>
      <Container>
        <Link to="/">
          <FaHome size={24} />
        </Link>
        <Link to="/login">
          <FaUserAlt size={24} />
        </Link>
        <Link to="/eu">
          <FaSignInAlt size={24} />
        </Link>
      </Container>
    </Nav>
  );
}
