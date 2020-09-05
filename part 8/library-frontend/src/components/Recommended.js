import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
const Recommended = ({ favoriteGenre, show }) => {
	const result = useQuery(ALL_BOOKS);
	const books = result?.data?.allBooks.filter((book) =>
		book.genres.includes(favoriteGenre)
	);

	if (!show) return null;
	return (
		<div>
			<h2>recommendations</h2>

			<h4>Books in your favorite genre {favoriteGenre}</h4>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books?.map((b) => (
						<tr key={b.id}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommended;
