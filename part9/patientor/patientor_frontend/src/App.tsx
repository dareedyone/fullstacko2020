import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";

import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import { setPatientList, useStateValue } from "./state";

const App: React.FC = () => {
	const [, dispatch] = useStateValue();
	// const patientMatch = useRouteMatch<{id: string}>("/patient/:id");
	// const routedPatient: Patient | undefined = patientMatch ? patients[patientMatch.params.id] : undefined ;
	React.useEffect(() => {
		axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			try {
				const { data: patientListFromApi } = await axios.get<Patient[]>(
					`${apiBaseUrl}/patients`
				);
				dispatch(setPatientList(patientListFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		fetchPatientList();
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<Container>
					<Header as="h1">Patientor</Header>
					<Button as={Link} to="/" primary>
						Home
					</Button>
					<Divider hidden />
					<Switch>
						{/* <Route path="/patients/:id" render={() => <PatientPage patient={routedPatient} />} /> */}
						<Route path="/patients/:id">
							<PatientPage />
						</Route>
						<Route path="/" render={() => <PatientListPage />} />
					</Switch>
				</Container>
			</Router>
		</div>
	);
};

export default App;
