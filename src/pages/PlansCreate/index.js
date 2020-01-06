import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { formatPrice } from '~/util/format';

import { planRequest } from '~/store/modules/auth/actions';

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

export default function PlansCreate() {
  const dispatch = useDispatch();

  const [pricePlan, setPrice] = useState(0);
  const [durationPlan, setDuration] = useState(0);
  const total = formatPrice(pricePlan * durationPlan);

  function handleSubmit({ title, duration, price }) {
    dispatch(planRequest(title, duration, price));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <strong name="id">Cadastro de plano</strong>
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
                readOnly
              />
            </div>
          </footer>
        </Content>
      </Form>
    </Container>
  );
}
