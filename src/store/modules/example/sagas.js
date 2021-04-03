import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as types from '../types';
import * as actions from './actions';

const requisicao = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(requisicao);
    yield put(actions.clickButtonSuccess());
  } catch {
    toast.error('Requisição rejeitada');
    yield put(actions.clickButtonFailure());
  }
}

export default all([takeLatest(types.BOTAO_CLICLADO_REQUEST, exampleRequest)]);
