import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { HospitalEntry } from "../types";
import { TextField, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";
interface Props {
	onSubmit: (values: HospitalEntryFormValues) => void;
	onCancel: () => void;
}
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
	const [{ diagnoses }] = useStateValue();
	return (
		<Formik
			initialValues={{
				type: "Hospital",
				specialist: "",
				date: "",
				diagnosisCodes: undefined,
				description: "",
				discharge: { date: "", criteria: "" },
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				// const errors: { [field: string]: string } = {};
				const errors: {
					specialist?: string;
					description?: string;
					date?: string;
					diagnosisCodes?: string;
					discharge?: {
						criteria?: string;
						date?: string;
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
				//to avoid error

				if (!values.discharge.date) {
					errors.discharge = {};
					// errors.discharge = requiredError;
					errors.discharge.date = requiredError;
				}
				if (!values.discharge.criteria) {
					errors.discharge = {};
					// errors.discharge = requiredError;
					errors.discharge.criteria = requiredError;
				}
				console.log(errors);

				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched, values, errors }) => {
				console.log(isValid);

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
							label="Discharge Criteria"
							placeholder="discharge criteria"
							name="discharge.criteria"
							component={TextField}
						/>
						<Field
							label="Discharge Date"
							placeholder="YYYY-MM-DD"
							name="discharge.date"
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
						<div>
							<pre>
								<b>|--Live-Debug--|</b>
								{JSON.stringify({ values, errors }, null, 2)}
							</pre>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default HospitalEntryForm;
