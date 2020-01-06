/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import {
  MdAdd,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import api from '~/services/api';

import { List, Container, ChangePage, Button } from './styles';

export default function Students() {
  const [nameStudent, setNameStudent] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: {
          page,
          nameStudent,
        },
      });

      setStudents(response.data);
    }

    loadStudents();
  }, [nameStudent, page]);

  function handleNext() {
    setPage(page + 1);
  }
  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  async function handleDelete(id, name) {
    if (window.confirm(`Deseja excluir o aluno ${name}  ?`)) {
      try {
        await api.delete(`students/${id}`);
        const deleteStudent = students.filter(student => student.id !== id);
        setStudents(deleteStudent);
        toast.success('Usuario deletado com sucesso !!');
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <Link to="/students/create">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </Link>
          <Form>
            <Input
              type="text"
              name="name"
              placeholder="Buscar aluno"
              onChange={e => setNameStudent(e.target.value)}
            />
          </Form>
        </div>
      </header>

      <List>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th id="age">IDADE</th>
            <th id="actions">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td id="age">{student.age}</td>
              <td id="actions">
                <Link to={`/students/update/${student.id}`} id="edit">
                  editar
                </Link>
                <button
                  type="button"
                  id="delete"
                  onClick={() => handleDelete(student.id, student.name)}
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
          disabled={students.length < 10}
        >
          <MdKeyboardArrowRight size={30} color="#de3b3b" />
        </Button>
      </ChangePage>
    </Container>
  );
}
