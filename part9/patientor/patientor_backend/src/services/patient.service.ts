/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
const getPatients = (): Patient[] => patients;
const getNonSensitivePatients = (): NonSensitivePatient[] =>
	patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));

const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		id: uuid(),
		...patient,
	};
	patients.push(newPatient);
	return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
