import React, { useEffect } from "react";
import { Card, Icon } from "semantic-ui-react";
import {
	Entry,
	OccupationalHealthcareEntry,
	HealthCheckEntry,
	HospitalEntry,
} from "../types";
import axios from "axios";
import { Diagnosis } from "./../types";
import { apiBaseUrl } from "./../constants";
import { setDiagnosisList } from "./../state/reducer";
import { useStateValue } from "../state";
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};
const HospitalEntryComp: React.FC<{
	entry: HospitalEntry;
	diagnoses: { [id: string]: Diagnosis };
}> = ({ entry: e, diagnoses }) => {
	return (
		<Card fluid>
			<Card.Content>
				<Card.Header>
					<small>{e.date}</small> <Icon name="hospital" />
				</Card.Header>
				<Card.Meta>{e.description}</Card.Meta>
				<Card.Meta>
					To be discharged on {e.discharge.date} when {e.discharge.criteria}
				</Card.Meta>
				<ul style={{ padding: "20px" }}>
					{e?.diagnosisCodes?.map((dc, i) => (
						<li key={i}>
							{dc} {diagnoses[dc]?.name}
						</li>
					))}
				</ul>
			</Card.Content>
		</Card>
	);
};

const OccupationalHealthcareComp: React.FC<{
	entry: OccupationalHealthcareEntry;
	diagnoses: { [id: string]: Diagnosis };
}> = ({ entry: e, diagnoses }) => {
	return (
		<Card fluid>
			<Card.Content>
				<Card.Header>
					<small>{e.date}</small> <Icon name="stethoscope" /> {e.employerName}
				</Card.Header>
				<Card.Meta>{e.description}</Card.Meta>
				<ul style={{ padding: "20px" }}>
					{e?.diagnosisCodes?.map((dc, i) => (
						<li key={i}>
							{dc} {diagnoses[dc]?.name}
						</li>
					))}
				</ul>
			</Card.Content>
		</Card>
	);
};
const HealthCheckEntryComp: React.FC<{ entry: HealthCheckEntry }> = ({
	entry: e,
}) => {
	const colorObj = { 0: "green", 1: "yellow", 2: "orange", 3: "red" };
	const color = colorObj[e.healthCheckRating] as
		| undefined
		| "yellow"
		| "green"
		| "orange"
		| "red";

	return (
		<Card fluid color={color}>
			<Card.Content>
				<Card.Header>
					<small>{e.date}</small> <Icon name="doctor" />
				</Card.Header>
				<Card.Meta>{e.description}</Card.Meta>
				<Icon name="heart" color={color} />
			</Card.Content>
		</Card>
	);
};
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	const [{ diagnoses }, dispatch] = useStateValue();
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
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryComp entry={entry} diagnoses={diagnoses} />;

		case "OccupationalHealthcare":
			return <OccupationalHealthcareComp entry={entry} diagnoses={diagnoses} />;

		case "HealthCheck":
			return <HealthCheckEntryComp entry={entry} />;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
