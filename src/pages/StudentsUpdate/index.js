import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';

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

export default function StudentsUpdate({ match }) {
  const [students, setStudents] = useState({});

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get(`/students/${match.params.id}`);
        setStudents(response.data);
      } catch (err) {
        toast.error(err.response.data.error || 'Erro ao carregar alunos');
      }
    }
    loadStudents();
  }, [match.params.id]);

  async function handleSubmit(data) {
    try {
      await api.put(`/students/${match.params.id}`, data);
      toast.success('Dados atualizados com sucesso!');
      history.push('/students');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={students} onSubmit={handleSubmit}>
        <header>
          <strong name="id">
            Edição do Aluno {match.params.id} - {students.name}
          </strong>
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

StudentsUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

StudentsUpdate.defaultProps = {
  match: '',
};
