import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import HealthCheckEntryForm, {
	HealthCheckEntryFormValues,
} from "./HealthCheckEntryForm";
import HospitalEntryForm, {
	HospitalEntryFormValues,
} from "./HospitalEntryForm";
import OccupationalEntryForm, {
	OccupationalEntryFormValues,
} from "./OccupationalEntryForm";
interface HospitalProps {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: HospitalEntryFormValues) => void;
	error?: string;
}

interface OccupationalProps {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: OccupationalEntryFormValues) => void;
	error?: string;
}
interface HealthCheckEntryProps {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: HealthCheckEntryFormValues) => void;
	error?: string;
}

export type EntryFormValues =
	| OccupationalEntryFormValues
	| HospitalEntryFormValues
	| HealthCheckEntryFormValues;

export const HospitalEntryModal = ({
	modalOpen,
	onClose,
	onSubmit,
	error,
}: HospitalProps) => (
	<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
		<Modal.Header>Add a new hospital entry</Modal.Header>
		<Modal.Content>
			{error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
			<HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</Modal.Content>
	</Modal>
);

export const OccupationalEntryModal = ({
	modalOpen,
	onClose,
	onSubmit,
	error,
}: OccupationalProps) => (
	<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
		<Modal.Header>Add a new occupational entry</Modal.Header>
		<Modal.Content>
			{error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
			<OccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</Modal.Content>
	</Modal>
);

export const HealthCheckEntryModal = ({
	modalOpen,
	onClose,
	onSubmit,
	error,
}: HealthCheckEntryProps) => (
	<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
		<Modal.Header>Add a new health check entry</Modal.Header>
		<Modal.Content>
			{error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
			<HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</Modal.Content>
	</Modal>
);
