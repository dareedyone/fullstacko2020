import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { OccupationalHealthcareEntry } from "../types";
import { TextField, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";
interface Props {
	onSubmit: (values: OccupationalEntryFormValues) => void;
	onCancel: () => void;
}
export type OccupationalEntryFormValues = Omit<
	OccupationalHealthcareEntry,
	"id"
>;

export const OccupationalEntryForm: React.FC<Props> = ({
	onSubmit,
	onCancel,
}) => {
	const [{ diagnoses }] = useStateValue();
	return (
		<Formik
			initialValues={{
				type: "OccupationalHealthcare",
				specialist: "",
				date: "",
				employerName: "",
				diagnosisCodes: undefined,
				description: "",
				sickLeave: { startDate: "", endDate: "" },
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const errors: {
					specialist?: string;
					description?: string;
					date?: string;
					employerName?: string;
					diagnosisCodes?: string;
					sickLeave?: {
						startDate?: string;
						endDate?: string;
					};
				} = {};
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.diagnosisCodes) {
					errors.diagnosisCodes = requiredError;
				}
				if (!values.employerName) {
					errors.employerName = requiredError;
				}
				//to avoid error

				if (!values.sickLeave?.startDate) {
					// errors.sickLeave = requiredError;
					errors.sickLeave = {};
					errors.sickLeave.startDate = requiredError;
				}
				if (!values.sickLeave?.endDate) {
					errors.sickLeave = {};
					// errors.sickLeave = requiredError;
					errors.sickLeave.endDate = requiredError;
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
							label="Employer Name"
							placeholder="employer name"
							name="employerName"
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
							label="Sick leave start-date"
							placeholder="YYYY-MM-DD"
							name="sickLeave.startDate"
							component={TextField}
						/>
						<Field
							label="Sick leave end-date"
							placeholder="YYYY-MM-DD"
							name="sickLeave.endDate"
							component={TextField}
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

export default OccupationalEntryForm;
