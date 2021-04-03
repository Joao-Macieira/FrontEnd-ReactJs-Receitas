import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

export default function Header() {
  const botaoCliclado = useSelector((state) => state.example.botaoCliclado);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/eu">
        <FaSignInAlt size={24} />
      </Link>
      {botaoCliclado ? 'Cliclado' : 'Não Cliclado'}
    </Nav>
  );
}
