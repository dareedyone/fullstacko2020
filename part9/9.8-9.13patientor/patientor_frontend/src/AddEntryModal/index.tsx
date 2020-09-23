import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import HospitalEntryForm, {
	HospitalEntryFormValues,
} from "./HospitalEntryForm";
interface HospitalProps {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: HospitalEntryFormValues) => void;
	error?: string;
}

export const HospitalEntryModal = ({
	modalOpen,
	onClose,
	onSubmit,
	error,
}: HospitalProps) => (
	<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
		<Modal.Header>Add a new Hospital entry</Modal.Header>
		<Modal.Content>
			{error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
			<HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</Modal.Content>
	</Modal>
);
