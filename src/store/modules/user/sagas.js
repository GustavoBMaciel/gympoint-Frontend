import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload, id }) {
  try {
    const { name, email, age, weight, height, ...rest } = payload.data;
    const { idStudent } = id;

    const profile = {
      name,
      email,
      age,
      weight,
      height,
      ...rest,
    };

    const response = yield call(api.put, `/students/${idStudent}`, profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
