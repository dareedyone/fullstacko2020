const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / ((height / 100) * (height / 100));
	console.log(bmi);

	if (bmi <= 18.5) return "underweight (unhealthy)";
	if (bmi >= 18.5 && bmi <= 25) return "normal (healthy weight)";
	if (bmi >= 25 && bmi <= 30) return "overweight (unhealthy)";
	if (bmi > 30) return "obese (unhealthy)";
};

console.log(calculateBmi(180, 74));
