import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo2.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <strong>GYMPOINT</strong>
          <NavLink
            activeStyle={{
              color: '#333',
            }}
            to="/students"
          >
            ALUNOS
          </NavLink>
          <NavLink
            activeStyle={{
              color: '#333',
            }}
            to="/plans"
          >
            PLANOS
          </NavLink>
          <NavLink
            activeStyle={{
              color: '#333',
            }}
            to="/registrations"
          >
            MATRÍCULAS
          </NavLink>
          <NavLink
            activeStyle={{
              color: '#333',
            }}
            to="/help-orders"
          >
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                Sair do GoBarber
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
