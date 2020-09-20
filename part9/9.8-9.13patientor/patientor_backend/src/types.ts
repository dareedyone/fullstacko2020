// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}
export enum Gender {
	Male = "male",
	Female = "female",
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}
export type NewPatient = Omit<Patient, "id">;
// export type NonSensitivePatient = Omit<Patient, "ssn">;
export type PublicPatient = Omit<Patient, "ssn" | "entries">;
