import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink} from 'apollo-link-http';
import ReactDOM from 'react-dom';
import { ApolloProvider} from '@apollo/react-hooks';
import './index.css';
import App from './App';
import * as _ from 'lodash';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import { ApolloLink, concat } from 'apollo-link';

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: 'http://localhost:4000/', headers: {
  authorization: `Bearer ${localStorage.getItem('token')}`
}});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext()
    const {
      response: { headers }
    } = context
    console.log(headers);

    if (headers) {
      const refreshToken = headers.get('accesstoken');
      console.log("Inside Headers");
      if (refreshToken) {
        localStorage.setItem("token", refreshToken)
      }
    }

    return response
  })
})
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: concat(afterwareLink, httpLink)
  });

ReactDOM.render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
