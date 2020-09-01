import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "./../queries";

const Authors = (props) => {
	const response = useQuery(ALL_AUTHORS);
	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await editAuthor({ variables: { name, setBornTo: Number(born) } });
		setName("");
		setBorn("");
	};
	if (!props.show) {
		return null;
	}
	const authors = response?.data?.allAuthors || [];

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h2>Set birthyear</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name{" "}
					<select
						onChange={(e) => setName(e.target.value)}
						value={name}
						name="authors"
					>
						{authors.map((a) => (
							<option key={a.name} value={a.name}>
								{a.name}
							</option>
						))}
					</select>
					{/* <input
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
					/> */}
				</div>
				<div>
					born{" "}
					<input
						name="born"
						value={born}
						onChange={(e) => setBorn(e.target.value)}
						type="number"
					/>
				</div>
				<button>update author</button>
			</form>
		</div>
	);
};

export default Authors;
