import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

console.log("token ", localStorage.getItem('token'));
const client = new ApolloClient({
  uri: 'http://localhost:3000',
  cache: new InMemoryCache(),
  headers: {authorization: localStorage.getItem('token')}
});

  export default client;