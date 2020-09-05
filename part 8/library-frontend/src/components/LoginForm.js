import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./../queries";

const LoginForm = ({ setToken, show }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [login, result] = useMutation(LOGIN);

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem("library-user-token", token);
		}
	}, [result.data]); //eslint-disable-line
	const handleSubmit = (e) => {
		e.preventDefault();
		login({ variables: { username, password } });
		setUsername("");
		setPassword("");
	};

	if (!show) return null;
	return (
		<div>
			<form onSubmit={handleSubmit}>
				name{" "}
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>{" "}
				<br />
				password{" "}
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>{" "}
				<br />
				<button>login</button>
			</form>
		</div>
	);
};

export default LoginForm;
