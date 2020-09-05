import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

const App = () => {
	const [page, setPage] = useState("authors");
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	useEffect(() => {
		localStorage.getItem("library-user-token") &&
			setToken(localStorage.getItem("library-user-token"));
	}, []);

	const handleLogout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};
	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{token && <button onClick={() => setPage("add")}>add book</button>}
				{token ? (
					<button onClick={handleLogout}>logout</button>
				) : (
					<button onClick={() => setPage("login")}>login</button>
				)}
			</div>

			<Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} />
			<LoginForm setToken={setToken} show={page === "login"} />
		</div>
	);
};

export default App;
