interface calcValues {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingsDescription: string;
}
const calculateExercises = (
	hours: Array<number>,
	target: number
): calcValues => {
	const periodLength = hours.length;
	const trainingDays = hours.filter((h) => h !== 0).length;
	const average = hours.reduce((a, b) => a + b) / periodLength;
	const success = average >= target;
	let rating;
	let ratingsDescription;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
