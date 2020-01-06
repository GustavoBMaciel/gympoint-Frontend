import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { Form, Input, Scope } from '@rocketseat/unform';
import Select from 'react-select';
import { addMonths, format } from 'date-fns';
import moment from 'moment';
import AsyncSelect from 'react-select/async';
import ReactDatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { planStyles, studentStyles } from './selectorStyle';

import { Container, Content } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

export default function RegistrationsUpdate({ match }) {
  const [oldStudents, setOldStudents] = useState({});
  const [nameStudent, setNameStudent] = useState('');
  const [oldPlans, setOldPlans] = useState({});
  const [optionsPlan, setOptionPlan] = useState([]);
  const [plans, setPlans] = useState({});

  const [total, setTotal] = useState(0);
  const ref = useRef(null);
  const [registrations, setRegistrations] = useState({});

  const dateWithMoment = moment(registrations.start_date).toDate();
  const endDatewithMoment = moment(registrations.end_date).toDate();
  const [newDate, setNewDate] = useState(dateWithMoment);

  const endDate = format(
    addMonths(newDate || new Date(), plans.duration || 0),
    "dd'/'MM'/'yyyy"
  );

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      const data = response.data.map(plan => ({
        ...plan,
        value: plan.id,
        label: plan.title,
      }));
      setOptionPlan(data);
    }
    loadPlans();
  }, []);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get(`/registrations/${match.params.id}`);

      const studentOld = {
        value: response.data.student.id,
        label: response.data.student.name,
      };
      const planOld = {
        value: response.data.plan.id,
        label: response.data.plan.title,
        duration: response.data.plan.duration,
        price: response.data.plan.price,
      };
      setTotal(formatPrice(response.data.price));
      setOldPlans(planOld);
      setNameStudent(response.data.student.name);
      setOldStudents(studentOld);
      setRegistrations(response.data, planOld);
    }

    loadRegistrations();
  }, [match.params.id]);

  async function loadStudents() {
    const response = await api.get('/students', {
      params: {
        nameStudent,
      },
    });
    const data = response.data.map(student => ({
      ...student,
      value: student.id,
      label: student.name,
    }));

    return data;
  }

  async function handleSubmit() {
    try {
      await api.put(`/registrations/${match.params.id}`, {
        student_id: oldStudents.value,
        plan_id: oldPlans.value,
        start_date: newDate || registrations.start_date,
      });
      toast.success('Edição efetuada com sucesso !!');
      history.push('/registrations');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  // schema={schema}
  return (
    <Container>
      <Form initialData={registrations} onSubmit={handleSubmit}>
        <header>
          <strong>Edição da Matrícula nº {match.params.id}</strong>
          <div>
            <Link to="/registrations">
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
          <label htmlFor="student_id">ALUNO</label>
          <Scope path="student">
            <AsyncSelect
              value={oldStudents}
              placeholder="BUSCAR ALUNO"
              styles={studentStyles}
              loadOptions={loadStudents}
              onInputChange={user => setNameStudent(user)}
              onChange={student => setOldStudents(student)}
            />
          </Scope>
          <footer>
            <div>
              <label htmlFor="plan">PLANO</label>
              <Select
                options={optionsPlan}
                value={oldPlans}
                styles={planStyles}
                onChange={plan => {
                  setOldPlans(plan);
                  setPlans(plan);
                  setTotal(formatPrice(plan.duration * plan.price));
                }}
                ref={ref}
              />
            </div>
            <div>
              <label htmlFor="start_date">DATA DE INÍCIO</label>
              <ReactDatePicker
                name="start_date"
                selected={dateWithMoment && !newDate ? dateWithMoment : newDate}
                onChange={date => setNewDate(date)}
                dateFormat="dd'/'MM'/'yyyy"
                minDate={new Date()}
              />
            </div>
            <div>
              <Input
                label="DATA DE TÉRMINO"
                type="text"
                name="end_date"
                value={
                  registrations.end_date && !newDate
                    ? endDatewithMoment
                    : endDate
                }
                disabled
                readOnly
              />
            </div>
            <div>
              <Input
                name="price"
                label="VALOR FINAL"
                value={total}
                type="text"
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

RegistrationsUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

RegistrationsUpdate.defaultProps = {
  match: '',
};
