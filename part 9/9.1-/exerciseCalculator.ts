interface calcValues {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingsDescription: string;
}
export const calculateExercises = (
	hours: Array<number>,
	target: number
): calcValues => {
	const periodLength = hours.length;
	const trainingDays = hours.filter((h) => h !== 0).length;
	const average = hours.reduce((a, b) => a + b) / periodLength;
	const success = average >= target;
	let rating = 0;
	let ratingsDescription = "none";
	const diff = target - average;

	if (diff <= 0) {
		rating = 3;
		ratingsDescription = "excellent";
	} else if (diff > 0 && diff <= 0.5) {
		rating = 2;
		ratingsDescription = "not too bad but could be better";
	} else if (diff > 1) {
		rating = 1;
		ratingsDescription = "too bad, try better next time";
	}

	return {
		periodLength,
		trainingDays,
		target,
		average,
		success,
		rating,
		ratingsDescription,
	};
};

const parseCalcArgs = (args: Array<string>): Array<number> => {
	if (args.length < 2) throw new Error("Not enough arguments");
	const neededValues = args.slice(2, args.length);

	const daysArray: Array<number> = [];
	neededValues.forEach((el) => {
		if (!isNaN(Number(el))) {
			daysArray.push(Number(el));
		} else {
			throw new Error("Provided values were not number");
		}
	});

	return daysArray;
};

try {
	const [target, ...hours] = parseCalcArgs(process.argv);
	console.log(calculateExercises(hours, target));
} catch (exp) {
	console.log(exp.message); //eslint-disable-line
}
