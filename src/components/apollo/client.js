import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

//removed typename to prevent problems when adding feedbacks
const client = new ApolloClient({
  uri: 'http://localhost:3000',
  cache: new InMemoryCache(
    {
      addTypename: false
    }
  ),
  headers: {authorization: localStorage.getItem('token')}
});

  export default client;