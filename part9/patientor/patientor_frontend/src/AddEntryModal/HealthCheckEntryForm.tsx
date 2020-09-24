import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HealthCheckEntry } from "../types";
import { TextField, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";
import { NumberField } from "../AddPatientModal/FormField";
interface Props {
	onSubmit: (values: HealthCheckEntryFormValues) => void;
	onCancel: () => void;
}
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

export const HealthCheckEntryForm: React.FC<Props> = ({
	onSubmit,
	onCancel,
}) => {
	const [{ diagnoses }] = useStateValue();
	return (
		<Formik
			initialValues={{
				type: "HealthCheck",
				specialist: "",
				date: "",
				diagnosisCodes: undefined,
				description: "",
				healthCheckRating: 0,
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const errors: {
					specialist?: string;
					description?: string;
					date?: string;
					diagnosisCodes?: string;
					healthCheckRating?: string;
				} = {};
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.healthCheckRating) {
					errors.healthCheckRating = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.diagnosisCodes) {
					errors.diagnosisCodes = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<Field
							label="Specialist"
							placeholder="specialist"
							name="specialist"
							component={TextField}
						/>

						<Field
							label="Description"
							placeholder="description"
							name="description"
							component={TextField}
						/>
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="healthCheckRating"
							name="healthCheckRating"
							component={NumberField}
							min={0}
							max={3}
						/>
						<DiagnosisSelection
							diagnoses={Object.values(diagnoses)}
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
						/>

						<Grid>
							<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onCancel} color="red">
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={5}>
								<Button
									type="submit"
									floated="right"
									color="green"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default HealthCheckEntryForm;
