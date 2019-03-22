import { GraphQLClient } from "graphql-request";

const { GRAPHQL_SERVER_URL, WRONG_TOKEN, TEST_EMAIL, TEST_PASSWORD, TEST_NAME } = process.env

const userQuery = `
  {
    user {
      id
      name
      email
    }
  }
`;

const authenticationMutation = `
  mutation authenticateUser($email: String! $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;


test("if token is malformed, it should throw an error", () => {
  expect.assertions(1);
  const config = {
    headers: {
      Authorization: "123"
    }
  }
  const client = new GraphQLClient(GRAPHQL_SERVER_URL, config);
  return client.request(userQuery)
  .then(response =>
    // expect(response).toEqual({ user: null })
    console.log('response',response)
  )
  .catch(e => {
    // console.log('e.response',e.response)
    expect(e.response.errors[0].message).toEqual("jwt malformed")
  });
});

test("if token is invalid, it should throw an error", () => {
  expect.assertions(1);
  const config = {
    headers: {
      Authorization: `Bearer ${WRONG_TOKEN}`
    }
  }
  const client = new GraphQLClient(GRAPHQL_SERVER_URL, config);
  return client.request(userQuery)
  .then(response =>
    // expect(response).toEqual({ user: null })
    console.log('response',response)
  )
  .catch(e => {
    // console.log('e.response',e.response)
    expect(e.response.errors[0].message).toEqual("invalid signature")
  });
});