/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import api from '~/services/api';
import { List, Container, ChangePage, Button } from './styles';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('/registrations', {
        params: {
          page,
        },
      });
      const data = response.data.map(registration => ({
        ...registration,
        formatStart: format(
          parseISO(registration.start_date),
          "dd' de 'MMMM' de' yyyy",
          {
            locale: pt,
          }
        ),
        formatEnd: format(
          parseISO(registration.end_date),
          "dd' de 'MMMM' de' yyyy",
          {
            locale: pt,
          }
        ),
      }));
      setRegistrations(data);
    }
    loadRegistrations();
  }, [page]);

  async function handleDelete(id) {
    if (window.confirm(`Deseja excluir a matrícula ${id} ?`)) {
      try {
        await api.delete(`registrations/${id}`);
        const deleteRegistrations = registrations.filter(
          registration => registration.id !== id
        );
        setRegistrations(deleteRegistrations);
        toast.success('Matrícula deletada com sucesso !!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  function handleNext() {
    setPage(page + 1);
  }
  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando matrículas</strong>
        <div>
          <Link to="/registrations/create">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </Link>
        </div>
      </header>

      <List>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th id="age">PLANO</th>
            <th id="age">INÍCIO</th>
            <th id="actions">TÉRMINO</th>
            <th id="age">ATIVA</th>
            <th id="actions">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map(registration => (
            <tr key={registration.id}>
              <td>
                {registration.student
                  ? registration.student.name
                  : 'Usuário deletado'}
              </td>
              <td id="age">
                {registration.plan ? registration.plan.title : 'Plano deletado'}
              </td>
              <td id="age">{registration.formatStart}</td>
              <td id="age">{registration.formatEnd}</td>
              <td id="age">{registration.active ? 'SIM' : 'NÃO'}</td>
              <td id="actions">
                <Link to={`/registrations/update/${registration.id}`} id="edit">
                  editar
                </Link>
                <button
                  type="button"
                  id="delete"
                  onClick={() => handleDelete(registration.id)}
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
        <Button
          type="button"
          onClick={handleNext}
          disabled={registrations.length < 10}
        >
          <MdKeyboardArrowRight size={30} color="#de3b3b" />
        </Button>
      </ChangePage>
    </Container>
  );
}
