import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, BigBox, ChangePage, Button } from './styles';
import Modal from './Modal';

export default function HelpOrders() {
  const [dblock, setDblock] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [page, setPage] = useState(1);

  function handleDisplay(id) {
    setDblock(true);
    setOrderId(id);
  }
  function handleDisplayNone(id) {
    setDblock(false);
    setOrders(orders.filter(order => order.id !== id));
  }
  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/help-orders', {
        params: {
          page,
        },
      });
      setOrders(response.data);
    }
    loadOrders();
  }, [page]);

  function handleNext() {
    setPage(page + 1);
  }
  function handlePrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  return (
    <Container>
      <Modal
        display={dblock}
        order={orderId}
        handleDisplayNone={handleDisplayNone}
      />

      <h2>Pedidos de Auxílio</h2>
      <BigBox>
        <h3>ALUNO</h3>

        {orders.map(order => (
          <div key={order.id}>
            <p>{order.student.name}</p>
            <button type="button" onClick={() => handleDisplay(order.id)}>
              responder
            </button>
          </div>
        ))}
      </BigBox>
      <ChangePage>
        <Button type="button" onClick={handlePrev} disabled={page === 1}>
          <MdKeyboardArrowLeft size={30} color="#de3b3b" />
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={orders.length < 10}
        >
          <MdKeyboardArrowRight size={30} color="#de3b3b" />
        </Button>
      </ChangePage>
    </Container>
  );
}
