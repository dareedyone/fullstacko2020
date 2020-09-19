import React from "react";
interface Course {
	name: string;
	exerciseCount: number;
}
const Content: React.FC<{ courses: Course[] }> = ({ courses }) => {
	return (
		<>
			{courses.map((c, i) => (
				<p key={i}>
					{c.name} {c.exerciseCount}
				</p>
			))}
		</>
	);
};

export default Content;
