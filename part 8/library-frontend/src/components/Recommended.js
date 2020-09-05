import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
const Recommended = ({ favoriteGenre, show }) => {
	const [allBooks, result] = useLazyQuery(ALL_BOOKS);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		allBooks({ variables: { genre: favoriteGenre } });
		if (result.data) {
			setBooks(result.data.allBooks);
		}
	}, [favoriteGenre, result.data]); //eslint-disable-line

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
