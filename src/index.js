import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import apolloLogger from "apollo-link-logger";

import Button from "./Button";
function token() {
  localStorage.setItem("token", prompt("Your token", ""));
  window.location.reload();
}

const httpLink = new HttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: "Bearer " + localStorage.getItem("token")
  }
});
const link = ApolloLink.from([apolloLogger, httpLink]);

const cache = new InMemoryCache({
  logger: console.log,
  loggerEnabled: true
});

const client = new ApolloClient({
  link,
  cache
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <div>
      <button class="btn btn-dark" onClick={() => token()}>
        Enter your token
      </button>
      <br />
      <br />
    </div>
    <Button />
  </ApolloProvider>,
  document.getElementById("root")
);
