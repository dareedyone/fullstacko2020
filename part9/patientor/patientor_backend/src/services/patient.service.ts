/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from "../../data/patients";
import { Patient, NewPatient, PublicPatient, Entry } from "../types";
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
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};
const addPatientEntry = (entry: Entry, id: string): Patient => {
	switch (entry.type) {
		case "Hospital":
			break;
		case "OccupationalHealthcare":
			break;
		case "HealthCheck":
			break;
		default:
			return assertNever(entry);
	}
	const patient = patients.find((p) => p.id === id);
	console.log(id, patient);

	if (!patient) throw new Error("patient not found");
	patient.entries.push(entry);
	return patient;
};
const getPatient = (id: string): Patient | undefined => {
	return patients.find((p) => p.id === id);
};

export default {
	getPatients,
	getNonSensitivePatients,
	addPatient,
	getPatient,
	addPatientEntry,
};
