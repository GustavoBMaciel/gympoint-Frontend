/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <h1>GYMPOINT</h1>

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email" id="emailLbl">
          SEU E-MAIL
        </label>
        <Input name="email" id="email" type="email" placeholder="Seu e-mail:" />
        <label htmlFor="password" id="passwordLbl">
          SUA SENHA
        </label>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Sua senha:"
        />

        <button type="submit">
          {loading ? 'Carregando..' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
