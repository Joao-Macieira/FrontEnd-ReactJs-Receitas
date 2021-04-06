import React, { useState } from 'react';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import history from '../../services/history';

import { Title, Container, Form } from './styled';

export default function SignIn() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !login || !password) {
      return toast.error('Preencha todos os dados');
    }

    const { data } = await axios.post('/user', {
      name,
      login,
      password,
    });

    if (data.error) return toast.error(data.error);

    toast.success('Conta criada com sucesso');
    return history.push('/login');
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Faça seu Cadastro</Title>
        <label htmlFor="name">
          Nome:{' '}
          <input
            type="text"
            placeholder="Nome..."
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="login">
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
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
