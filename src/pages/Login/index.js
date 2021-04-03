import React from 'react';
// import { useDispatch } from 'react-redux';

import { Title, Paragrafo } from './styled';

export default function Login() {
  // const dispatch = useDispatch();

  return (
    <>
      <Title>
        Login <small>iai</small>
      </Title>
      <Paragrafo>Lorem ipsum</Paragrafo>
      <button type="button">Enviar</button>
    </>
  );
}
