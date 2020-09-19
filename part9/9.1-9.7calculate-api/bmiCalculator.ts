export const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / ((height / 100) * (height / 100));
	console.log(bmi);
	let returnString = "";
	if (bmi <= 18.5) returnString = "underweight (unhealthy)";
	if (bmi >= 18.5 && bmi <= 25) returnString = "normal (healthy weight)";
	if (bmi >= 25 && bmi <= 30) returnString = "overweight (unhealthy)";
	if (bmi > 30) returnString = "obese (unhealthy)";

	return returnString;
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
	console.log(exp.message); //eslint-disable-line
}
