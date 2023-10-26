import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./utils/auth-config.json";
import Firebase, { FirebaseContext } from './Components/Firebase';

const client = new ApolloClient({
  uri: "https://proud-mole-68.hasura.app/v1/graphql",
  headers: {
    
    "x-hasura-admin-secret": "D4xIbErxG2kh7fz06UZ7JxiXs28t2HDn3Q0rp8uSzjYAyjNiB242eFc0wbhioBVB",
  },
});

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <FirebaseContext.Provider value={new Firebase()}>
          <App />
        </FirebaseContext.Provider>
      </Auth0Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
