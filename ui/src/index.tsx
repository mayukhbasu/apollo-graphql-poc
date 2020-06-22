import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink} from 'apollo-link-http';
import ReactDOM from 'react-dom';
import { ApolloProvider} from '@apollo/react-hooks';
import './index.css';
import App from './App';
import Cookie from "js-cookie";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import { ApolloLink, concat, from} from 'apollo-link';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: 'http://localhost:4000/'});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    // console.log("inside afterware");
    
    const {
      response: { headers }
    } = context
    
    if (headers) {
      console.error()
      const accesstoken = headers.get('accesstoken');
      
      if (accesstoken !== null) {
        localStorage.setItem("token", accesstoken)
      } else {
        console.log("Other block")
      }
    }

    return response
  })
})
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: from([authLink, afterwareLink, httpLink])
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
