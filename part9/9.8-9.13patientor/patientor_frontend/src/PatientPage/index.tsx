import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "./../types";
import axios from "axios";
import { apiBaseUrl } from "./../constants";
import { Icon } from "semantic-ui-react";

const PatientPage: React.FC = () => {
	const [{ patients }, dispatch] = useStateValue();
	const genderIcon = { male: "mars", female: "venus", other: "neuter" };
	const { id } = useParams<{ id: string }>();
	const patient = patients[id];
	const gender = genderIcon[patient?.gender] as
		| "mars"
		| "venus"
		| "neuter"
		| undefined;
	useEffect(() => {
		const fetchPatient = async () => {
			try {
				const { data: patientFromApi } = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${id}`
				);
				dispatch({ type: "ADD_PATIENT", payload: patientFromApi });
			} catch (e) {
				console.error(e);
			}
		};

		!patient && fetchPatient();
	}, [id, patient, dispatch]);

	return (
		<>
			<h1>
				{patient?.name} <Icon name={gender} />
			</h1>
			<p>ssn: {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
		</>
	);
};
export default PatientPage;
