import express from "express";
// import bodyParser from "body-parser";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
const PORT = 3002;
app.use(express.json());
// app.use(bodyParser())

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
	const { height, weight } = req.query;

	if (isNaN(Number(height)) || isNaN(Number(weight))) {
		res.json({ error: "malformatted parameters" });
	} else {
		const bmi = calculateBmi(Number(height), Number(weight));
		res.json({
			weight,
			height,
			bmi,
		});
	}
});
app.post("/exercises", (req, res) => {
	// interface clientVal {
	// 	daily_exercises: Array<number>;
	// 	target: number;
	// }
	let error = false;
	const { daily_exercises, target } = req.body;
	if (!daily_exercises || !target)
		return res.status(400).json({
			error: "parameters missing",
		});
	if (isNaN(Number(target))) {
		return res.status(400).json({
			error: "malformatted parameters",
		});
	}

	daily_exercises.forEach((ex: number) => {
		if (isNaN(Number(ex))) {
			error = true;
		}
	});

	if (error)
		return res.status(400).json({
			error: "malformatted parameters",
		});

	const result = calculateExercises(daily_exercises, target);

	return res.json(result);
});
app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
