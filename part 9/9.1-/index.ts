import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();
const PORT = 3002;

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
app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
