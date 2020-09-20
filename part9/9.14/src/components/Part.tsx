import React from "react";
import { CoursePart } from "../index";

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
	const atrr = Object.keys(course);
	const val = Object.values(course);
	return (
		<ul
			style={{
				listStyle: "none",
				display: "flex",
				justifyContent: "space-around",
			}}
		>
			{atrr.map((a, i) => (
				<li key={i}>
					{a} : {val[i]}
				</li>
			))}
		</ul>
	);
};

export default Part;
