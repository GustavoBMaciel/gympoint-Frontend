import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import StudentsCreate from '~/pages/StudentsCreate';
import StudentsUpdate from '~/pages/StudentsUpdate';
import Plans from '~/pages/Plans';
import PlansCreate from '~/pages/PlansCreate';
import PlansUpdate from '~/pages/PlansUpdate';
import Registrations from '~/pages/Registrations';
import RegistrationsCreate from '~/pages/RegistrationsCreate';
import RegistrationsUpdate from '~/pages/RegistrationsUpdate';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/create" component={StudentsCreate} isPrivate />
      <Route path="/students/update/:id" component={StudentsUpdate} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/create" component={PlansCreate} isPrivate />
      <Route path="/plans/update/:id" component={PlansUpdate} isPrivate />
      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/create"
        component={RegistrationsCreate}
        isPrivate
      />
      <Route
        path="/registrations/update/:id"
        component={RegistrationsUpdate}
        isPrivate
      />
      <Route path="/help-orders" exact component={HelpOrders} isPrivate />
    </Switch>
  );
}
