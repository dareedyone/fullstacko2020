const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / ((height / 100) * (height / 100));
	console.log(bmi);

	if (bmi <= 18.5) return "underweight (unhealthy)";
	if (bmi >= 18.5 && bmi <= 25) return "normal (healthy weight)";
	if (bmi >= 25 && bmi <= 30) return "overweight (unhealthy)";
	if (bmi > 30) return "obese (unhealthy)";
};
const parseArgs = (args: Array<string>): Array<number> => {
	if (args.length < 4) throw new Error("Not enough arguments");
	if (args.length > 4) throw new Error("Too many arguments");

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return args.slice(2, 4).map((d) => Number(d));
	} else {
		throw new Error("Provided values were not number");
	}
};

try {
	const [val1, val2] = parseArgs(process.argv);
	console.log(calculateBmi(val1, val2));
} catch (exp) {
	console.log(exp.message);
}
