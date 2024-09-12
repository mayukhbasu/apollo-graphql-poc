"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsers = fetchUsers;
const apolloClient_1 = __importDefault(require("./apolloClient"));
const queries_1 = require("./queries");
async function fetchUsers() {
    try {
        const response = await apolloClient_1.default.query({
            query: queries_1.GET_USERS
        });
        console.log(response.data);
    }
    catch (err) {
        console.error('Error fetching users:', err);
    }
}
