// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";

import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const wsUrl = "wss://wo47rxljmk.sse.codesandbox.io/graphql";

const httpLink = new HttpLink({
  uri: "https://wo47rxljmk.sse.codesandbox.io/"
});

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

//setup Apollo Client

const apolloClient = new ApolloClient({
  link
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  apolloProvider,
  components: { App },
  template: "<App/>"
});
