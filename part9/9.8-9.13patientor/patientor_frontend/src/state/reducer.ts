/* eslint-disable no-mixed-spaces-and-tabs */
import { State } from "./state";
import { Patient } from "../types";
import { Diagnosis } from "./../types";

export type Action =
	| {
			type: "SET_PATIENT_LIST";
			payload: Patient[];
	  }
	| {
			type: "ADD_PATIENT";
			payload: Patient;
	  }
	| {
			type: "SET_DIAGNOSIS_LIST";
			payload: Diagnosis[];
	  };

export const setPatientList = (pl: Patient[]): Action => {
	return { type: "SET_PATIENT_LIST", payload: pl };
};

export const setDiagnosisList = (dl: Diagnosis[]): Action => {
	return { type: "SET_DIAGNOSIS_LIST", payload: dl };
};

export const addPatient = (p: Patient): Action => {
	return { type: "ADD_PATIENT", payload: p };
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_PATIENT_LIST":
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients,
				},
			};
		case "SET_DIAGNOSIS_LIST":
			return {
				...state,
				diagnoses: {
					...action.payload.reduce(
						(memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
						{}
					),
					...state.diagnoses,
				},
			};
		case "ADD_PATIENT":
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		default:
			return state;
	}
};
