import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Diagnosis, Patient } from "./../types";
import axios from "axios";
import { apiBaseUrl } from "./../constants";
import { Icon } from "semantic-ui-react";
import { addPatient, setDiagnosisList } from "./../state/reducer";

const PatientPage: React.FC = () => {
	const [{ patients, diagnoses }, dispatch] = useStateValue();
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

	useEffect(() => {
		const fetchDiagnosisList = async () => {
			try {
				const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
					`${apiBaseUrl}/diagnoses`
				);
				dispatch(setDiagnosisList(diagnosisListFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		fetchDiagnosisList();
	}, [dispatch]);
	console.log(diagnoses);

	return (
		<>
			<h1>
				{patient?.name} <Icon name={gender} />
			</h1>
			<p>ssn: {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
			<h2>entries</h2>

			<ul>
				{patient?.entries.map((e) =>
					e.type === "Hospital" ? (
						<li key={e.id}>
							<p>
								To be discharged, {e.discharge.date} {e.description}
							</p>
							<ul>
								{e?.diagnosisCodes?.map((dc, i) => (
									<li key={i}>
										{dc} {diagnoses[dc]?.name}
									</li>
								))}
							</ul>
						</li>
					) : e.type === "OccupationalHealthcare" ? (
						<li key={e.id}>
							<p>
								{e.sickLeave?.startDate} {e.description}
							</p>
							<ul>
								{e?.diagnosisCodes?.map((dc, i) => (
									<li key={i}>
										{dc} {diagnoses[dc]?.name}
									</li>
								))}
							</ul>
						</li>
					) : e.type === "HealthCheck" ? (
						<li key={e.id}>
							<p>
								{" "}
								Rating: {e.healthCheckRating} {e.description}
							</p>
							<ul>
								{e?.diagnosisCodes?.map((dc, i) => (
									<li key={i}>
										{dc} {diagnoses[dc]?.name}
									</li>
								))}
							</ul>
						</li>
					) : (
						<li>no entries</li>
					)
				)}
			</ul>
		</>
	);
};
export default PatientPage;
