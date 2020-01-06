import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório'),
  duration: Yup.number()
    .required('Campo obrigatório')
    .typeError('Insira uma duração'),
  price: Yup.number()
    .required('Campo obrigatório')
    .typeError('Insira um preço'),
});

export default function PlansUpdate({ match }) {
  const [plans, setPlans] = useState({});

  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const total = formatPrice(price * duration);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get(`/plans/${match.params.id}`);
        setPlans(response.data);
        setDuration(response.data.duration);
        setPrice(response.data.price);
      } catch (err) {
        toast.error(err.response.data.error || 'Erro ao carregar plano');
      }
    }
    loadPlans();
  }, [match.params.id]);

  async function handleSubmit(data) {
    try {
      await api.put(`/plans/${match.params.id}`, data);
      toast.success('Dados atualizados com sucesso!');
      history.push('/plans');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={plans} onSubmit={handleSubmit}>
        <header>
          <strong name="id">
            Edição do Plano {match.params.id} - {plans.title}
          </strong>
          <div>
            <Link to="/plans">
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
          <Input label="TÍTULO DO PLANO" type="text" name="title" />
          <footer>
            <div>
              <Input
                label="DURAÇÃO (em meses)"
                type="number"
                name="duration"
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="PREÇO MENSAL"
                type="number"
                name="price"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="PREÇO TOTAL"
                type="text"
                value={total}
                name="total"
                step="0.01"
                min="0"
                max="10"
                id="total"
                disabled
                readOnly
              />
            </div>
          </footer>
        </Content>
      </Form>
    </Container>
  );
}

PlansUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PlansUpdate.defaultProps = {
  match: '',
};
