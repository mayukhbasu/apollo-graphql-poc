"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USERS = void 0;
// queries.ts
const client_1 = require("@apollo/client");
exports.GET_USERS = (0, client_1.gql) `
  query {
    getUsers {
      email
      id
    }
  }
`;
