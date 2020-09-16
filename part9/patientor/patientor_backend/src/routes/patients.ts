import express from "express";
import patientService from "../services/patient.service";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
	res.json(patientService.getNonSensitivePatients());
});

patientRouter.post("/", (req, res) => {
	res.json(patientService.addPatient(req.body));
});

export default patientRouter;
