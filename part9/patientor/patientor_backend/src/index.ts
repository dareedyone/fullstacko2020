import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.get("/api/ping", (_req, res) => {
	res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
