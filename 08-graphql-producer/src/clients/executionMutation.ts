import { gql } from '@apollo/client';
import client from './apolloClient';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
      isActive
    }
  }
`;

// Prepare the variables to be passed
const variables = {
  data: {
    name: "John Doe",
    email: "john.doe@example.com",
    isActive: true,
  },
};

// Execute the mutation
async function createUser() {
  try {
    const response = await client.mutate({
      mutation: CREATE_USER_MUTATION,
      variables,
    });

    console.log('User created:', response.data.createUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();