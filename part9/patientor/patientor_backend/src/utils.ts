/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewPatient, Gender } from "./types";
const isString = (text: any): text is string => {
	return typeof text === "string" || text instanceof String;
};
const parseString = (val: any, name: string): string => {
	if (!val || !isString(val))
		throw new Error(`Incorect or missing ${name}: ${String(val)}`);
	return val;
};
const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};
const parseDate = (date: any): string => {
	if (!date || !isString(date) || !isDate(date))
		throw new Error(`Incorect or missing date: ${String(date)}`);
	return date;
};
const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
	if (!gender || !isGender(gender))
		throw new Error(`Incorect or missing gender: ${String(gender)}`);
	return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => ({
	name: parseString(object.name, "name"),
	dateOfBirth: parseDate(object.dateOfBirth),
	occupation: parseString(object.occupation, "occupation"),
	ssn: parseString(object.ssn, "ssn"),
	gender: parseGender(object.gender),
	entries: [],
});
