import * as types from '../types';

export function clickButtonRequest() {
  return { type: types.BOTAO_CLICLADO_REQUEST };
}

export function clickButtonSuccess() {
  return { type: types.BOTAO_CLICLADO_SUCCESS };
}

export function clickButtonFailure() {
  return { type: types.BOTAO_CLICLADO_FAILURE };
}
