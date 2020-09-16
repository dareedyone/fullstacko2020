import express from "express";
import patientService from "../services/patient.service";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
	res.json(patientService.getNonSensitivePatients());
});

export default patientRouter;
