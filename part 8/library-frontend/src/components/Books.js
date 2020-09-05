import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
	const result = useQuery(ALL_BOOKS);
	const [genre, setGenre] = useState("all");
	if (!props.show) {
		return null;
	}

	const allBooks = result?.data?.allBooks || [];
	const books =
		genre === "all"
			? allBooks
			: allBooks.filter((b) => b.genres.includes(genre));
	const genres = result?.data?.allBooks
		?.reduce((acc, curr) => acc.concat(curr.genres), [])
		.reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), []);

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((b) => (
						<tr key={b.id}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<ul style={{ listStyle: "none", display: "flex" }}>
				{genres.map((g, i) => (
					<li key={i}>
						<button onClick={() => setGenre(g)}>{g}</button>
					</li>
				))}
				<li>
					<button onClick={() => setGenre("all")}>all</button>
				</li>
			</ul>
		</div>
	);
};

export default Books;
