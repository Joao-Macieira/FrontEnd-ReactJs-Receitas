import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../Context/AuthContext';

import { Title, Container, Form } from './styled';

export default function Login() {
  const { handleLogin } = useContext(Context);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(login, password);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Seja Bem-vindo</Title>
        <label htmlFor="name">
          Login:{' '}
          <input
            type="text"
            placeholder="Login..."
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Senha:{' '}
          <input
            type="password"
            placeholder="Senha..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Entrar</button>

        <small>
          <Link to="/cadastro">
            Ainda não possui conta ? Se cadastre clicando aqui !
          </Link>
        </small>
      </Form>
    </Container>
  );
}
