/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { List, Container, ChangePage, Button } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans', {
        params: {
          page,
        },
      });
      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
        monthFormatted:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
      }));
      setPlans(data);
    }
    loadPlans();
  }, [page]);

  function handleNext() {
    setPage(page + 1);
  }
  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  async function handleDelete(id, title) {
    if (window.confirm(`Deseja excluir o plano ${title}  ?`)) {
      try {
        await api.delete(`plans/${id}`);
        const deletePlan = plans.filter(plan => plan.id !== id);
        setPlans(deletePlan);
        toast.success('Plano deletado com sucesso !!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando planos</strong>
        <div>
          <Link to="/plans/create">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </Link>
        </div>
      </header>

      <List>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th id="age">DURAÇÃO</th>
            <th id="age">VALOR p/ MÊS</th>
            <th id="actions">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td id="age">{plan.monthFormatted}</td>
              <td id="age">{plan.priceFormatted}</td>
              <td id="actions">
                <Link to={`/plans/update/${plan.id}`} id="edit">
                  editar
                </Link>
                <button
                  type="button"
                  id="delete"
                  onClick={() => handleDelete(plan.id, plan.title)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </List>
      <ChangePage>
        <Button type="button" onClick={handlePrev} disabled={page === 1}>
          <MdKeyboardArrowLeft size={30} color="#de3b3b" />
        </Button>
        <Button type="button" onClick={handleNext} disabled={plans.length < 10}>
          <MdKeyboardArrowRight size={30} color="#de3b3b" />
        </Button>
      </ChangePage>
    </Container>
  );
}
