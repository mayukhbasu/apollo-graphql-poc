"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const apolloClient_1 = __importDefault(require("./apolloClient"));
const CREATE_USER_MUTATION = (0, client_1.gql) `
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
        const response = await apolloClient_1.default.mutate({
            mutation: CREATE_USER_MUTATION,
            variables,
        });
        console.log('User created:', response.data.createUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
}
createUser();
