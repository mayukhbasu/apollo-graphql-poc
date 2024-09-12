import client from "./apolloClient";
import { GET_USERS } from "./queries";

export async function fetchUsers () {
  try {
    const response = await client.query({
      query: GET_USERS
    });
    console.log(response.data)
  } catch(err) {
    console.error('Error fetching users:', err);
  }
}