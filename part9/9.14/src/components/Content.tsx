import React from "react";
import { CoursePart } from "..";
import Part from "./Part";

const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};
	courses.forEach((part) => {
		switch (part.name) {
			case "Fundamentals":
				break;
			case "Using props to pass data":
				break;
			case "Deeper type usage":
				break;
			case "Next in line":
				break;
			default:
				return assertNever(part);
		}
	});
	return (
		<>
			{courses.map((c, i) => (
				<div key={i}>
					<Part course={c} />
					<hr />
				</div>
			))}
		</>
	);
};

export default Content;
