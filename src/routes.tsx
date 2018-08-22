import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import PhoneBook from './components/PhoneBook';

export const routes = (
  <Switch>
    <Layout>
      <Route exact path="(/|/googlePay)" component={PhoneBook} />
    </Layout>
  </Switch>
);

export default () => routes;
