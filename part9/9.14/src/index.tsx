import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import Header from "./components/Header";
import Content from "./components/Contetent";
import Total from "./components/Total";

const App: React.FC = () => {
	const courseName = "Half Stack application development";
	const courseParts = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
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
