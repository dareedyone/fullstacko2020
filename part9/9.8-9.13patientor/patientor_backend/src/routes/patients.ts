import express from "express";
import patientService from "../services/patient.service";
import { toNewPatient } from "./../utils";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
	res.json(patientService.getNonSensitivePatients());
});
patientRouter.get("/:id", (req, res) => {
	res.json(patientService.getPatient(req.params.id));
});

patientRouter.post("/", (req, res) => {
	const newPatient = toNewPatient(req.body);
	res.json(patientService.addPatient(newPatient));
});

export default patientRouter;
