import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
const app = express();
const PORT = 3001;
app.use(cors());
app.get("/api/ping", (_req, res) => {
	res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
