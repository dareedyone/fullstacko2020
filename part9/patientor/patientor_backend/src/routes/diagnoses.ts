import express from "express";
import diagnoseService from "../services/diagnose.service";
const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
	res.json(diagnoseService.getDiagnoses());
});

export default diagnoseRouter;
