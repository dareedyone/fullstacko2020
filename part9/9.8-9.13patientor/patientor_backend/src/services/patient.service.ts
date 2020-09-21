/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from "../../data/patients";
import { Patient, NewPatient, PublicPatient } from "../types";
import { v1 as uuid } from "uuid";
const getPatients = (): Patient[] => patients;
const getNonSensitivePatients = (): PublicPatient[] =>
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
const getPatient = (id: string): Patient | undefined => {
	return patients.find((p) => p.id === id);
};

export default { getPatients, getNonSensitivePatients, addPatient, getPatient };
