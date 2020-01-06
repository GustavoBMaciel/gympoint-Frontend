import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatorio'),
  age: Yup.number('Somente numeros inteiros')
    .integer()
    .required('A idade é obrigatória')
    .typeError('Insira uma idade válida'),
  weight: Yup.number('Somente numeros')
    .required('O peso é obrigatório')
    .typeError('Insira um peso válido'),
  height: Yup.number()
    .required('A altura é obrigatoria')
    .typeError('Insira uma atura válida'),
});

export default function StudentsCreate() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, age, weight, height }) {
    dispatch(signUpRequest(name, email, age, weight, height));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <strong>Cadastro de Aluno</strong>
          <div>
            <Link to="/students">
              <MdArrowBack size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </div>
        </header>
        <Content>
          <Input label="NOME COMPLETO" type="text" name="name" />
          <Input label="ENDEREÇO DE E-MAIL" type="email" name="email" />
          <footer>
            <div>
              <Input label="IDADE" type="number" name="age" />
            </div>
            <div>
              <Input
                label="PESO(em kg)"
                type="number"
                step="0.01"
                name="weight"
              />
            </div>
            <div>
              <Input label="ALTURA" type="number" step="0.01" name="height" />
            </div>
          </footer>
        </Content>
      </Form>
    </Container>
  );
}
