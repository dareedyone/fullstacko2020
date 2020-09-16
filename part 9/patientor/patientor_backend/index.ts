import express from "express";
const app = express();
const PORT = 3005;

app.get("/ping", (_req, res) => {
	res.send("pong");
});

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
