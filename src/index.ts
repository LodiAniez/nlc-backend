import express from "express";
import cors from "cors";
import { router } from "@routes/index";
import { PORT } from "@secrets/index";

const app = express();

app.use(cors());
app.use(express.json());

router(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
