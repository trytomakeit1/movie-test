import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

import client from './components/apollo/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>, document.getElementById("root"));