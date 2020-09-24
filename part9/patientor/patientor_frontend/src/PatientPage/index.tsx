import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "./../constants";
import { Card, Icon, Button } from "semantic-ui-react";
import { addPatient, addPatientEntry } from "./../state/reducer";
import EntryDetails from "../components/EntryDetails";
import { Patient } from "./../types";
import { HospitalEntryModal } from "../AddEntryModal";
import { HospitalEntryFormValues } from "../AddEntryModal/HospitalEntryForm";

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

	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};
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

	const submitNewEntry = async (values: HospitalEntryFormValues) => {
		try {
			const { data: updatedPatient } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch(addPatientEntry({ id, patient: updatedPatient }));
			closeModal();
		} catch (e) {
			console.error(e.response.data);
			setError(e.response.data.error);
		}
	};

	return (
		<>
			<h1>
				{patient?.name} <Icon name={gender} />
			</h1>
			<p>ssn: {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
			<h2>entries</h2>
			<Button onClick={() => openModal()}>Add New Entry</Button>
			<HospitalEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>

			<Card.Group>
				{patient?.entries.map((e, i) => (
					<EntryDetails key={i} entry={e} />
				))}
			</Card.Group>
		</>
	);
};
export default PatientPage;
