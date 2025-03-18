import express from "express";
import cors from "cors";
import { router } from "@routes/index";
import { PORT } from "@secrets/index";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
