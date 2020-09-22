import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "./../constants";
import { Card, Icon } from "semantic-ui-react";
import { addPatient } from "./../state/reducer";
import EntryDetails from "../components/EntryDetails";
import { Patient } from "./../types";

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
				dispatch(addPatient(patientFromApi));
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
			<h2>entries</h2>

			<Card.Group>
				{patient?.entries.map((e) => (
					<EntryDetails key={e.id} entry={e} />
				))}
			</Card.Group>
		</>
	);
};
export default PatientPage;
