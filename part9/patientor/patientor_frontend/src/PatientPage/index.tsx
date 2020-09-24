import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "./../constants";
import { Card, Icon, Button } from "semantic-ui-react";
import { addPatient, addPatientEntry } from "./../state/reducer";
import EntryDetails from "../components/EntryDetails";
import { Patient } from "./../types";
import {
	EntryFormValues,
	HospitalEntryModal,
	OccupationalEntryModal,
} from "../AddEntryModal";

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
	const [error, setError] = React.useState<string | undefined>();
	const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(
		false
	);
	const openHospitalModal = (): void => setHospitalModalOpen(true);
	const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<
		boolean
	>(false);
	const openOccupationalModal = (): void => setOccupationalModalOpen(true);

	const closeModal = (): void => {
		setHospitalModalOpen(false);
		setOccupationalModalOpen(false);
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

	const submitNewEntry = async (values: EntryFormValues) => {
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
			<Button onClick={() => openHospitalModal()}>
				Add New Hospital Entry
			</Button>
			<Button onClick={() => openOccupationalModal()}>
				Add New Occupational Entry
			</Button>
			<HospitalEntryModal
				modalOpen={hospitalModalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>
			<OccupationalEntryModal
				modalOpen={occupationalModalOpen}
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
