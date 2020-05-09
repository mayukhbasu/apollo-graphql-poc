import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Routes from './routes';


export const TEST_QUERY = gql `
  {
    dummy
  }
`
const App = () => {
  const response = useQuery(TEST_QUERY);
  console.log(response);
  return (
    <Routes/>
  )
}

export default App;