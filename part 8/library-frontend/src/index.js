import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	ApolloProvider,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
const authLink = setContext((_, { headers }) => {
	const userToken = JSON.parse(localStorage.getItem("library-user-token"));
	return {
		headers: {
			...headers,
			authorization: userToken ? `bearer ${userToken.value}` : null,
		},
	};
});
const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
