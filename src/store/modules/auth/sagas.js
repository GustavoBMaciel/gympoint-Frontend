import { takeLatest, put, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/students');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    history.push('/students');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados.');

    yield put(signFailure());
  }
}

export function* planRequest({ payload }) {
  try {
    const { title, duration, price } = payload;

    yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });

    history.push('/plans');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados.');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/PLAN_REQUEST', planRequest),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
