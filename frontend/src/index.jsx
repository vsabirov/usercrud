import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const gqlClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={gqlClient}>
    <App />
  </ApolloProvider>
);