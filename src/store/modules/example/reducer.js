import * as types from '../types';

const initialState = {
  botaoCliclado: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICLADO_SUCCESS: {
      console.log('Sucesso');
      const newState = { ...state };
      newState.botaoCliclado = !newState.botaoCliclado;
      return newState;
    }

    case types.BOTAO_CLICLADO_FAILURE: {
      console.log('Deu erro!');
      return state;
    }

    case types.BOTAO_CLICLADO_REQUEST: {
      console.log('Estou fazendo a requisição');
      return state;
    }

    default: {
      return state;
    }
  }
}
