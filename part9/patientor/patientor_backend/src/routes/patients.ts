import express from "express";
import patientService from "../services/patient.service";
import { toNewPatient } from "./../utils";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
	res.json(patientService.getPatients());
});
patientRouter.get("/:id", (req, res) => {
	res.json(patientService.getPatient(req.params.id));
});

patientRouter.post("/:id/entries", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	res.json(patientService.addPatientEntry(req.body, req.params.id));
});
patientRouter.post("/", (req, res) => {
	const newPatient = toNewPatient(req.body);
	res.json(patientService.addPatient(newPatient));
});

export default patientRouter;
