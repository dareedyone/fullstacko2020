import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

// new types
interface CoursePartBase {
	name: string;
	exerciseCount: number;
}
interface CoursePartBase1 extends CoursePartBase {
	description: string;
}

interface CoursePartOne extends CoursePartBase1 {
	name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
	name: "Using props to pass data";
	groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase1 {
	name: "Deeper type usage";
	description: string;
	exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBase1 {
	name: "Next in line";
	date: string;
}

export type CoursePart =
	| CoursePartOne
	| CoursePartTwo
	| CoursePartThree
	| CoursePartFour;
const App: React.FC = () => {
	const courseName = "Half Stack application development";
	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is an awesome course part",
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
			groupProjectCount: 3,
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
			description: "Confusing description",
			exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
		},
		{
			name: "Next in line",
			exerciseCount: 7,
			description: "Confusing description",
			date: "jan 2020",
		},
	];

	const total = courseParts.reduce(
		(carry, part) => carry + part.exerciseCount,
		0
	);

	return (
		<div>
			<Header name={courseName} />

			<Content courses={courseParts} />
			<Total total={total} />
		</div>
	);
};

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

ReactDOM.render(<App />, document.getElementById("root"));
