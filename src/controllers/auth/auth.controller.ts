import { Router } from "express";

const app = Router();

app.get("/", (_, res) => {
  res.send("Hello from auth controller");
});

export default app;
