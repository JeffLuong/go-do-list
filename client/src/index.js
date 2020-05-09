import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import AppRouter from './routes/index';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('app')
);
