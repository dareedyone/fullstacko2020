import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommended from "./components/Recommended";

const App = () => {
	const [page, setPage] = useState("authors");
	const [userToken, setUserToken] = useState(null);
	const client = useApolloClient();

	useEffect(() => {
		localStorage.getItem("library-user-token") &&
			setUserToken(JSON.parse(localStorage.getItem("library-user-token")));
	}, []);

	const handleLogout = () => {
		setUserToken(null);
		localStorage.clear();
		client.resetStore();
	};
	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{userToken && (
					<>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("recommended")}>recommended</button>
					</>
				)}
				{userToken ? (
					<button onClick={handleLogout}>logout</button>
				) : (
					<button onClick={() => setPage("login")}>login</button>
				)}
			</div>

			<Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} />
			<LoginForm setUserToken={setUserToken} show={page === "login"} />
			<Recommended
				favoriteGenre={userToken?.user.favoriteGenre}
				show={page === "recommended"}
			/>
		</div>
	);
};

export default App;
